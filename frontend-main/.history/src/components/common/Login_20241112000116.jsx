import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import p2 from '../../images/p2.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import axios from '../../utils/axios'; // Ensure Axios instance is imported

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '', password: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', user); // Ensure the correct endpoint is used
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        const a = localStorage.getItem('userData');
        message.success('Login successfully');
        const isLoggedIn = JSON.parse(localStorage.getItem("userData"));
        const { type } = isLoggedIn;

        switch (type) {
          case "admin":
            navigate("/adminHome");
            break;
          case "user":
            navigate("/userhome");
            break;
          default:
            navigate("/login");
            break;
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error);
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

<MDBContainer className="login-container">
      <MDBCard className="login-card">
        <MDBRow className="login-row">
          {/* Left side container for the image */}
          <MDBCol md="6" className="login-left d-flex justify-content-center align-items-center">
            <MDBCardImage src={p2} alt="login form" className="login-image" />
          </MDBCol>

          {/* Right side container for login details */}
          <MDBCol md="6" className="login-right">
            <MDBCardBody>
              <h1 className="login-heading text-center fw-bold mb-2">Log in to your account</h1>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <MDBInput
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    type='email'
                    autoComplete='off'
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <MDBInput
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    type='password'
                    autoComplete='off'
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="login-button">Login</Button>
              </Form>
              <div className="center-link-container">
  <p className="register-link">
    Don't have an account? 
    <a href="/register" className="register-link-text">Register here</a>
  </p>
</div>

            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>

    </>
  );
};

export default Login;
