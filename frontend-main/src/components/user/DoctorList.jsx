import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {
   const [dateTime, setDateTime] = useState('');
   const [documentFile, setDocumentFile] = useState(null);
   const [show, setShow] = useState(false);

   const currentDate = new Date().toISOString().slice(0, 16);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleChange = (event) => {
      setDateTime(event.target.value);
   };

   const handleDocumentChange = (event) => {
      setDocumentFile(event.target.files[0]);
   };

   const handleBook = async (e) => {
      e.preventDefault();
      try {
         const formattedDateTime = dateTime.replace('T', ' ');
         const formData = new FormData();
         formData.append('image', documentFile); 
         formData.append('date', formattedDateTime);
         formData.append('userId', userDoctorId);
         formData.append('doctorId', doctor._id);
         formData.append('userInfo', JSON.stringify(userdata));
         formData.append('doctorInfo', JSON.stringify(doctor));

         const res = await axios.post('http://localhost:8000/api/user/getappointment', formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
               'Content-Type': 'multipart/form-data',
            },
         });

         if (res.data.success) {
            message.success(res.data.message);
         } else {
            message.error(res.data.message);
         }
      } catch (error) {
         console.log(error);
         message.error('Something went wrong');
      }
   };

   return (
      <>
         <Card style={{ width: '18rem' }} className="doctor-card">
            <Card.Body>
               <Card.Title className="doctor-card-title">Dr. {doctor.fullName}</Card.Title>
               <div className="doctor-info">
                  <Card.Text className="doctor-info-item">
                     <p>Phone: <b>{doctor.phone}</b></p>
                  </Card.Text>
                  <Card.Text className="doctor-info-item">
                     <p>Address: <b>{doctor.address}</b></p>
                  </Card.Text>
                  <Card.Text className="doctor-info-item">
                     <p>Specialization: <b>{doctor.specialization}</b></p>
                  </Card.Text>
                  <Card.Text className="doctor-info-item">
                     <p>Experience: <b>{doctor.experience} Yrs</b></p>
                  </Card.Text>
                  <Card.Text className="doctor-info-item">
                     <p>Fees: <b>{doctor.fees}</b></p>
                  </Card.Text>
                  <Card.Text className="doctor-info-item">
                     <p>Timing: <b>{doctor.timings[0]} : {doctor.timings[1]}</b></p>
                  </Card.Text>
               </div>
               <Button variant="primary" onClick={handleShow} className="book-now-button">
                  Book Now
               </Button>
               <Modal show={show} onHide={handleClose} className="booking-modal">
                  <Modal.Header closeButton>
                     <Modal.Title className="title">BOOKING APPOINMENT</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={handleBook}>
                     <Modal.Body>
                        <strong className="doctor-heading">DOCTOR DETAILS :</strong>
                        <br />
                        Name:&nbsp;&nbsp;{doctor.fullName}
                       <br />
                        Specialization:&nbsp;<b className="dr-specialization">{doctor.specialization}</b>
                        <hr />
                        <Row className='mb-3'>
                           <Col md={{ span: 8, offset: 2 }}>
                              <Form.Group controlId="formDateTime" className="mb-3">
                                 <Form.Label>Appointment Date and Time:</Form.Label>
                                 <Form.Control
                                    name='date'
                                    type="datetime-local"
                                    size="sm"
                                    min={currentDate}
                                    value={dateTime}
                                    onChange={handleChange}
                                    className="datetime-input"
                                 />
                              </Form.Group>

                              <Form.Group controlId="formDocument" className="mb-3">
                                 <Form.Label>Documents</Form.Label>
                                 <Form.Control 
                                    accept="image/*" 
                                    type="file" 
                                    size="sm" 
                                    onChange={handleDocumentChange} 
                                    className="document-input"
                                 />
                              </Form.Group>

                           </Col>
                        </Row>
                     </Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} className="close-button">
                           Close
                        </Button>
                        <Button type='submit' variant="primary" className="book-button">
                           Book
                        </Button>
                     </Modal.Footer>
                  </Form>
               </Modal>
            </Card.Body>
         </Card>
      </>
   );
}

export default DoctorList;

