import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";
import DoctorAppointments from './components/user/DoctorAppointments'; // Corrected path
//import BookAppointment from './components/user/BookAppointment'; // Import the component

function App() {
  const userLoggedIn = !!localStorage.getItem("userData");

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {userLoggedIn ? (
              <>
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/userhome/userappointments/:doctorId" element={<UserAppointments />} />
                <Route path="/doctor/appointments" element={<DoctorAppointments />} /> {/* Added new route */}
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </div >
        <footer className="custom-footer text-center text-lg-start">
  {/* Line above the footer */}
  <div className="footer-line"></div>
  
  <div className="text-center p-3">
    © 2023 Copyright: MediCareBook
  </div>
</footer>

      </Router>
    </div>
  );
}

export default App;
