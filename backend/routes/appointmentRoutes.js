const express = require("express");
const { bookAppointmentController, getUserAppointmentsController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to book an appointment
router.post("/bookappointment", authMiddleware, bookAppointmentController);

// Route to get user appointments
router.get('/getuserappointments', authMiddleware, getUserAppointmentsController);

module.exports = router;
