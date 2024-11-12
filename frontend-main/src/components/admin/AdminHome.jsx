import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Notification from '../common/Notification';
import AdminUsers from './AdminUsers';
import AdminDoctors from './AdminDoctors';
import AdminAppointments from './AdminAppointments';
import { Navbar, Container, Nav } from 'react-bootstrap';

const AdminHome = () => {
  const [userdata, setUserData] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('adminappointments');

  const getUserData = async () => {
    try {
      await axios.post('http://localhost:8000/api/user/getuserdata', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUserData(user);
    }
  };

  useEffect(() => {
    getUserData();
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <>
      {/* Main Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand className="brand-link">
            <Link to={'/'}>MediCareBook</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll />
            <Nav className="admin-indicator">
              <div className="admin-label">Admin</div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='navbar-line'></div>

      {/* Main Content Section */}
      <div className='main'>
        <div className="layout">
          <div className="sidebar">
            <div className="menu">
              {/* Users Button */}
              <div
                className={`menu-items ${activeMenuItem === 'adminusers' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('adminusers')}
              >
                <Button className="menu-button" variant="contained">
                  {/* FontAwesome User Icon */}
                  <FontAwesomeIcon className="icon" icon={faUser} /> Users
                </Button>
              </div>
              
              {/* Appointments Button */}
              <div
                className={`menu-items ${activeMenuItem === 'adminappointments' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('adminappointments')}
              >
                <Button className="menu-button" variant="contained">
                  {/* FontAwesome Calendar Icon */}
                  <FontAwesomeIcon className="icon" icon={faCalendarAlt} /> Appointments
                </Button>
              </div>
              
              {/* Logout Button */}
              <div className="menu-items">
                <Button className="menu-button" onClick={logout} variant="contained">
                  {/* FontAwesome SignOut Icon */}
                  <FontAwesomeIcon className="icon" icon={faSignOutAlt} /> Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="content">
            <div className="body">
              {activeMenuItem === 'notification' && <Notification />}
              {activeMenuItem === 'adminusers' && <AdminUsers />}
              {activeMenuItem === 'admindoctors' && <AdminDoctors />}
              {activeMenuItem === 'adminappointments' && <AdminAppointments />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;










