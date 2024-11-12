import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const BookAppointment = () => {
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('userData'));
    const userId = user._id;
    const userInfo = JSON.stringify({ fullName: user.fullName, phone: user.phone });
    const doctorInfo = JSON.stringify({ fullName: "Doctor Name", email: "doctor@example.com" }); // replace with actual doctor info

    try {
      const res = await axios.post('http://localhost:8000/api/appointment/bookappointment', {
        userId,
        doctorId,
        date,
        userInfo,
        doctorInfo
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error booking appointment: ", error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='p-3 text-center'>Book an Appointment</h2>
      <Form>
        <Form.Group controlId="doctorId">
          <Form.Label>Doctor ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleBooking} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Book Appointment'}
        </Button>
      </Form>
    </div>
  );
};

export default BookAppointment;
