import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import p3 from '../../images/p3.png';
import aboutImage from '../../images/about-image.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
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
          <Button variant="primary" className="btn-space">Home</Button>
        </Link>
        <Link to={'/login'}>
          <Button variant="primary" className="btn-space">Login</Button>
        </Link>
        <Link to={'/register'}>
          <Button variant="primary" className="btn-space">Register</Button>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<div className='navbar-line'></div>

      <div className='home-container'>
        <div className="left-side">
          <img alt="" src={p3} />
        </div>
        <div className="right-side">
          <p>
            <span className='f-letter'>Book Appoinment</span><br />
            <span className='s-letter'>With Trusted Doctors</span> <br />
            <span className='t-letter'>Simply browse through our extensive list of trusted doctors,<br />schedule your appoinment hassle-free,and take the first step <br />toward better health with just a few clicks.</span><br />
            <Button className='mt-3 register'>
              <Link to={'/login'}>Book Appoinment <FontAwesomeIcon icon={faArrowRightLong} className="icon-style" /></Link>
            </Button>
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <Container>
        <h1 className='text-center mb-4 about-heading'>ABOUT US</h1>
        <div className="about-container">
          {/* Left Side - Image */}
          <div className="left-side">
            <img src={aboutImage} alt="About Us" className="about-image" />
          </div>

          <div className="right-side">
      <div className="about-content">
        <p>
          <strong>Welcome to MediCareBook</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediCareBook, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
        </p>
        <p>
        MediCareBook is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediCareBook is here to support you every step of the way.
        </p>
        <h3>Our Vision</h3>
        <p>
          Our vision at MediCareBook is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
        </p>
      </div>
    </div>
  </div>
</Container>
    </>
  );
};

export default Home;
