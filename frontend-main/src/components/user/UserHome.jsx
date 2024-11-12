import React, { useEffect, useState } from 'react';
import { Badge, Row, Button } from 'antd';
import Notification from '../common/Notification';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlus, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';

const UserHome = () => {
   const [doctors, setDoctors] = useState([]);
   const [userdata, setUserData] = useState({});
   const [activeMenuItem, setActiveMenuItem] = useState('');

   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user) {
         setUserData(user);
      }
   };

   const getUserData = async () => {
      try {
         const res = await axios.post('http://localhost:8000/api/user/getuserdata', {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token'),
            },
         });
         if (res.data.success) {
            setUserData(res.data.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const getDoctorData = async () => {
      try {
         const res = await axios.get('http://localhost:8000/api/user/getalldoctorsu', {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token'),
            },
         });
         if (res.data.success) {
            setDoctors(res.data.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUser();
      getUserData();
      getDoctorData();
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

    <Navbar.Collapse id="navbarScroll" className="justify-content-end">
      {/* Notification Icon and Doctor's Name inside a container */}
      <div className="doctor-info-container">
        <Badge
          className={`notify ${activeMenuItem === 'notification' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('notification')}
          count={userdata?.notification ? userdata.notification.length : 0}
        >
          <FontAwesomeIcon className="icon" icon={faBell} />
        </Badge>

        {/* Display the doctor's name */}
        <span className="navbar-doctor-name">
          {userdata.isdoctor ? `Dr. ${userdata.fullName}` : userdata.fullName}
        </span>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
<div className='navbar-line'></div>


         <div className='main'>
            <div className="layout">
               <div className="sidebar">
                  <div className="menu">
                     {/* Appointments Button */}
                     <Button
                        className={`menu-button ${activeMenuItem === 'userappointments' ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick('userappointments')}
                        variant="outline-primary"
                     >
                        <FontAwesomeIcon className="icon" icon={faCalendarAlt} /> Appointments
                     </Button>

                     {/* Apply Doctor Button */}
                     {userdata.isdoctor === true ? null : (
                        <Button
                           className={`menu-button ${activeMenuItem === 'applyDoctor' ? 'active' : ''}`}
                           onClick={() => handleMenuItemClick('applyDoctor')}
                           variant="outline-success"
                        >
                           <FontAwesomeIcon className="icon" icon={faPlus} /> Apply Doctor
                        </Button>
                     )}

                     {/* Logout Button */}
                     <Button
                        className="menu-button"
                        onClick={logout}
                        variant="outline-danger"
                     >
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} /> Logout
                     </Button>
                  </div>
               </div>

               <div className="content">
                  <div className="header">
                  </div>

                  <div className="body">
                     {activeMenuItem === 'applyDoctor' && <ApplyDoctor userId={userdata._id} />}
                     {activeMenuItem === 'notification' && <Notification />}
                     {activeMenuItem === 'userappointments' && <UserAppointments />}
                     {activeMenuItem !== 'applyDoctor' && activeMenuItem !== 'notification' && activeMenuItem !== 'userappointments' && (
                        <Container>
                           <h2 className="text-center p-2">Home</h2>

                           {userdata.isdoctor === true ? null : (
                              <Row>
                                 {doctors && doctors.map((doctor, i) => {
                                    let notifyDoc = doctor.userId;
                                    return (
                                       <DoctorList userDoctorId={notifyDoc} doctor={doctor} userdata={userdata} key={i} />
                                    );
                                 })}
                              </Row>
                           )}
                        </Container>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default UserHome;



