const express = require("express");
const { registerController, registerDoctorController, loginController, getAllDoctorsController, bookAppointmentController, getUserDataController, markAllNotificationsReadController, deleteAllNotificationsController, getUserAppointmentsController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer"); 


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const router = express.Router();

// User Registration 
router.post("/register", registerController); 

// User Login 
router.post("/login", loginController); 

// Doctor Registration 
router.post("/registerdoc", authMiddleware, registerDoctorController); 

// Get All Doctors 
router.get("/getalldoctorsu", authMiddleware, getAllDoctorsController); 

// Book Appointment 
router.post("/getappointment", authMiddleware, upload.single('image'), bookAppointmentController); 

// Get User Data 
router.post("/getuserdata", authMiddleware, getUserDataController); 

// Mark All Notifications as Read 
router.post("/getallnotification", authMiddleware, markAllNotificationsReadController); 

// Delete All Notifications ā
router.post("/deleteallnotification", authMiddleware, deleteAllNotificationsController); 

// Get User Appointments
router.get('/getuserappointments',authMiddleware,getUserAppointmentsController);

// Protected Route
router.get('/protected-route', authMiddleware, (req, res) => {
    console.log("User ID in protected route:", req.userId);
    res.json({ message: "Access granted", user: req.userId });
  });
  

module.exports = router;
