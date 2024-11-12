import React, { useEffect, useState } from 'react';
import { Table, message, Button, Spin, Alert } from 'antd';
import axios from 'axios';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/doctor/getdoctorappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (appointmentId, status) => {
    try {
      const res = await axios.post('http://localhost:8000/api/doctor/handlestatus', {
        appointmentId,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments(); // Refresh the appointment list after updating status
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <h2 className='text-center'>Appointments</h2>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : appointments.length > 0 ? (
        <Table dataSource={appointments} columns={[
          { title: 'Patient Name', dataIndex: ['userId', 'fullName'], key: 'fullName' },
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Button onClick={() => handleStatus(record._id, 'approved')}>Approve</Button>
            ),
          },
        ]} />
      ) : (
        <Alert message="No Appointments to show" type="info" showIcon />
      )}
    </div>
  );
};

export default DoctorAppointments;
