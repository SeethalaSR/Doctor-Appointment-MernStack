import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/getallusers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        console.log(users);
      }
    } catch (error) {
      console.log(error);
    }
  }, []); // Empty dependency array means this function will not change unless dependencies change

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Is Admin', dataIndex: 'type', key: 'type', render: (type) => (type === 'admin' ? 'Yes' : 'No') },
    { title: 'Is Doctor', dataIndex: 'isDoctor', key: 'isDoctor', render: (isDoctor) => (isDoctor ? 'Yes' : 'No') },
  ];

  return (
    <div>
      <h4 className='p-3 text-center'>All Users</h4>
      <Container>
        <Table className='my-3' striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>isAdmin</th>
              <th>isDoctor</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.type === 'admin' ? 'Yes' : 'No'}</td>
                  <td>{user.isDoctor ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <Alert variant="info">
                    <Alert.Heading>No Users to show</Alert.Heading>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminUsers;
