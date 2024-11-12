const docSchema = require("../models/docModel");
const appointmentSchema = require("../models/appointmentModel");
const userSchema = require("../models/userModel");
const fs = require("fs");
const path = require('path');

const updateDoctorProfileController = async (req, res) => {
  try {
    const doctor = await docSchema.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found", success: false });
    }

    return res.status(200).send({
      success: true,
      data: doctor,
      message: "Successfully updated profile",
    });
  } catch (error) {
    console.log("Update profile error:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const getAllDoctorAppointmentsController = async (req, res) => {
  try {
    // Find doctor by userId
    const doctor = await docSchema.findOne({ userId: req.userId });

    // Log doctor ID to confirm it's retrieved correctly
    console.log("Doctor ID:", doctor ? doctor._id : "Doctor not found");

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found", success: false });
    }

    // Retrieve all appointments for the doctor
    const allAppointments = await appointmentSchema
      .find({ doctorId: doctor._id })
      .populate("userId", "fullName email phone");

    // Log appointments to confirm they are retrieved correctly
    console.log("All Appointments:", allAppointments);

    return res.status(200).send({
      message: "All the appointments are listed below.",
      success: true,
      data: allAppointments,
    });
  } catch (error) {
    console.log("Fetch appointments error:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};


const handleStatusController = async (req, res) => {
  try {
    const { userid, appointmentId, status } = req.body;

    const appointment = await appointmentSchema.findOneAndUpdate(
      { _id: appointmentId },
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found", success: false });
    }

    const user = await userSchema.findById(userid);

    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }

    user.notification.push({
      type: "status-updated",
      message: `Your appointment has been ${status}`,
      onClickPath: `/appointments/${appointmentId}`, // Include the onClickPath
    });

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Successfully updated appointment status",
    });
  } catch (error) {
    console.log("Update status error:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const documentDownloadController = async (req, res) => {
  const appointId = req.query.appointId;
  try {
    const appointment = await appointmentSchema.findById(appointId);

    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found", success: false });
    }

    const documentUrl = appointment.document?.path;

    if (!documentUrl || typeof documentUrl !== "string") {
      return res.status(404).send({ message: "Document URL is invalid", success: false });
    }

    const absoluteFilePath = path.join(__dirname, "..", documentUrl);

    fs.access(absoluteFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send({ message: "File not found", success: false, error: err });
      }

      res.setHeader("Content-Disposition", `attachment; filename="${path.basename(absoluteFilePath)}"`);
      res.setHeader("Content-Type", "application/octet-stream");

      const fileStream = fs.createReadStream(absoluteFilePath);
      fileStream.on('error', (error) => {
        console.log("File stream error:", error);
        return res.status(500).send({ message: "Error reading the document", success: false, error: error });
      });
      fileStream.pipe(res);

      fileStream.on('end', () => {
        console.log('File download completed.');
        res.end();
      });
    });
  } catch (error) {
    console.log("Document download error:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

module.exports = {
  updateDoctorProfileController,
  getAllDoctorAppointmentsController,
  handleStatusController,
  documentDownloadController,
};
