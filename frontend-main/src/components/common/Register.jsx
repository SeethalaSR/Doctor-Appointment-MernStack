import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import p2 from '../../images/p2.png';

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from 'mdb-react-ui-kit';
import axios from '../../utils/axios'; // Ensure axios is properly configured

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '', email: '', password: '', phone: '', type: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/register', user);
      if (res.data.success) {
        message.success('Registered Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
 <Navbar expand="lg" className="navbar-custom">
  <Container fluid>
    <Navbar.Brand className="brand-link">
      <Link to={'/'}>MediCareBook</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
      </Nav>
      <Nav className="nav-links">
        <Link to={'/'}>
          <Button variant="primary" className="mx-2">Home</Button>
        </Link>
        <Link to={'/login'}>
          <Button variant="primary" className="mx-2">Login</Button>
        </Link>
        <Link to={'/register'}>
          <Button variant="primary" className="mx-2">Register</Button>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<div className='navbar-line'></div>

      <MDBContainer className="register-container">
  <MDBCard className="register-card">
    <MDBRow className="register-row">
      
      {/* Right side container for the image, now moved to the left */}
      <MDBCol md="6" className="register-right d-flex justify-content-center align-items-center">
        <img src={p2} alt="signup" className="register-image" />
      </MDBCol>

      {/* Left side container for registration details, now on the right */}
      <MDBCol md="6" className="register-left">
        <MDBCardBody>
        <h1 className="signup-heading text-center fw-bold mb-2">Sign up to your account</h1>
        <Form onSubmit={handleSubmit} className="register-form">
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label className="custom-form-label">Full Name</Form.Label>
              <MDBInput name='fullName' value={user.fullName} onChange={handleChange} type='text' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="custom-form-label">Email</Form.Label>
              <MDBInput name='email' value={user.email} onChange={handleChange} type='email' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="custom-form-label">Password</Form.Label>
              <MDBInput name='password' value={user.password} onChange={handleChange} type='password' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label className="custom-form-label">Phone</Form.Label>
              <MDBInput name='phone' value={user.phone} onChange={handleChange} type='text' />
            </Form.Group>
{/* Radio Buttons for Admin/User selection */}
<Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">User Type</Form.Label>
                    <div className="radio-buttons">
                      <MDBRadio
                        name="type"
                        value="admin"
                        checked={user.type === 'admin'}
                        onChange={handleChange}
                        label="Admin"
                        inline
                      />
                      <MDBRadio
                        name="type"
                        value="user"
                        checked={user.type === 'user'}
                        onChange={handleChange}
                        label="User"
                        inline
                      />
                    </div>
                  </Form.Group>
            <Button variant="primary" type="submit" className="register-button">Register</Button>
          </Form>
          <p className="login-link mb-5 pb-md-2">
  Have an account? <Link to={'/login'} className="login-link-text">Login here</Link>
</p>
        </MDBCardBody>
      </MDBCol>
    </MDBRow>
  </MDBCard>
</MDBContainer>

    </>
  );
};

export default Register;