import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd'; // Import message from 'antd'

const AdminAppointments = () => {

   const [allAppointments, setAllAppointments] = useState([]); // Define state for appointments

   const getAppointments = async () => {
      try {
         const res = await axios.get('http://localhost:8000/api/admin/getallappointmentsadmin', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            },
         });
         if (res.data.success) { 
            setAllAppointments(res.data.data); // Correct state update function
         } else { 
            message.error(res.data.message); 
         }

      } catch (error) {
         console.error("Error fetching appointments:", error); 
         message.error('Something went wrong');
      }
   }

   useEffect(() => {
      getAppointments();
   }, []);

   return (
      <div>
         <h2 className='p-3 text-center'>All Appointments for Admin Panel</h2>
         <Container>
            <Table className='my-3' striped bordered hover>
               <thead>
                  <tr>
                     <th>Appointment ID</th>
                     <th>User Name</th>
                     <th>Doctor Name</th>
                     <th>Date</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {allAppointments.length > 0 ? (
                     allAppointments.map((appointment) => {
                        return (
                           <tr key={appointment._id}>
                              <td>{appointment._id}</td>
                              <td>{appointment.userInfo.fullName}</td>
                              <td>{`Dr. ${appointment.doctorInfo.fullName}`}</td>
                              <td>{appointment.date}</td>
                              <td>{appointment.status}</td> 
                           </tr>
                        )
                     })
                  ) : (
                     <tr>
                        <td colSpan={6}>
                           <Alert variant="info">
                              <Alert.Heading>No Appointments to show</Alert.Heading>
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

export default AdminAppointments;
