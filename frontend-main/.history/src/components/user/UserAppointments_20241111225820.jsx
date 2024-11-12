import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const UserAppointments = () => {
  const [userId, setUserId] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details from local storage
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      const { _id, isDoctor } = user;
      setUserId(_id);
      setIsDoctor(isDoctor);
    } else {
      alert('No user to show');
    }
  };

  // Fetch appointments based on user type
  const fetchAppointments = async () => {
    setLoading(true);
    const endpoint = isDoctor
      ? 'http://localhost:8000/api/doctor/getdoctorappointments'
      : 'http://localhost:8000/api/user/getuserappointments';

    try {
      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const handleStatus = async (userId, appointmentId, status) => {
    try {
      const res = await axios.post('http://localhost:8000/api/doctor/handlestatus', {
        userid: userId,
        appointmentId,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        fetchAppointments(); // Refresh the appointment list after updating status
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  // Download document functionality
  const handleDownload = async (url, appointId) => {
    try {
      const res = await axios.get('http://localhost:8000/api/doctor/getdocumentdownload', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { appointId },
        responseType: 'blob',
      });
      if (res.data) {
        const fileUrl = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        const downloadLink = document.createElement("a");
        downloadLink.href = fileUrl;
        downloadLink.download = url.split("/").pop(); // Extract filename
        downloadLink.click();
      } else {
        message.error('No document available for download');
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  // Initial data fetching and re-fetching based on `isDoctor`
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAppointments();
    }
  }, [userId, isDoctor]);

  return (
    <div>
      <h2 className='p-3 text-center'>All Appointments</h2>
      <Container>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : appointments.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                {isDoctor ? (
                  <>
                    <th>Name</th>
                    <th>Date of Appointment</th>
                    <th>Phone</th>
                    <th>Document</th>
                    <th>Status</th>
                    <th>Action</th>
                  </>
                ) : (
                  <>
                    <th>Doctor Name</th>
                    <th>Date of Appointment</th>
                    <th>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  {isDoctor ? (
                    <>
                      <td>{appointment.userId.fullName}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.userInfo.phone}</td>
                      <td>
                        <Button variant="link" onClick={() => handleDownload(appointment.document.path, appointment._id)}>
                          {/* {appointment.document.filename} */}
                        </Button>
                      </td>
                      <td>{appointment.status}</td>
                      <td>
                        {appointment.status !== 'approved' && (
                          <Button onClick={() => handleStatus(appointment.userInfo._id, appointment._id, 'approved')}>
                            Approve
                          </Button>
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{appointment.doctorInfo.fullName}</td> 
                      <td>{appointment.date}</td>
                      <td>{appointment.status}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info" className="text-center">
            <Alert.Heading>No Appointments to show</Alert.Heading>
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default UserAppointments;
