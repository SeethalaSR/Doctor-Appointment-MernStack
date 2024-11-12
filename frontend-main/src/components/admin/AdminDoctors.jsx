import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/getalldoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleApprove = async (doctorId, userid) => {
    try {
      const res = await axios.post('http://localhost:8000/api/admin/approve-doctor', { doctorId, status: 'approved', userid }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Refresh doctor list
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleReject = async (doctorId, userid) => {
    try {
      const res = await axios.post('http://localhost:8000/api/admin/reject-doctor', { doctorId, status: 'rejected', userid }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Refresh doctor list
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div>
      <h2 className='p-3 text-center'>All Doctors</h2>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor._id}</td>
                  <td>{`Dr. ${doctor.fullName}`}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>
                    {doctor.status === 'pending' ? (
                      <Button onClick={() => handleApprove(doctor._id, doctor.userId)} className='mx-2' size='sm' variant="outline-success">
                        Approve
                      </Button>
                    ) : (
                      <Button onClick={() => handleReject(doctor._id, doctor.userId)} className='mx-2' size='sm' variant="outline-danger">
                        Reject
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <Alert variant="info">
                    <Alert.Heading>No Doctors to show</Alert.Heading>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminDoctors;
