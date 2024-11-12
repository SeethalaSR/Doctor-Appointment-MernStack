const express = require("express");
const { 
  getAllUsersControllers, 
  getAllDoctorsControllers, 
  getStatusApproveController, 
  getStatusRejectController, 
  displayAllAppointmentController 
} = require("../controllers/adminC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User Routes
router.get("/getallusers", authMiddleware, getAllUsersControllers);

// Doctor Routes
router.get("/getalldoctors", authMiddleware, getAllDoctorsControllers);

// Approval Routes
router.post("/approve-doctor", authMiddleware, getStatusApproveController);
router.post("/reject-doctor", authMiddleware, getStatusRejectController);

// Appointments Route
router.get("/getallappointmentsadmin", authMiddleware, displayAllAppointmentController);

module.exports = router;
