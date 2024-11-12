const docSchema = require("../models/docModel");
const userSchema = require("../models/userModel");
const appointmentSchema = require("../models/appointmentModel");

const getAllUsersControllers = async (req, res) => {
  try {
    const users = await userSchema.find({});
    console.log("Fetched users: ", users); // Debug log
    return res.status(200).send({
      message: "Users data list",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log("Error fetching users: ", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const getAllDoctorsControllers = async (req, res) => {
  try {
    const docUsers = await docSchema.find({});
    console.log("Fetched doctors: ", docUsers); // Debug log
    return res.status(200).send({
      message: "Doctor users data list",
      success: true,
      data: docUsers,
    });
  } catch (error) {
    console.log("Error fetching doctors: ", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const getStatusApproveController = async (req, res) => {
  try {
    const { doctorId, userid } = req.body;
    
    // Update doctor's status
    const doctor = await docSchema.findByIdAndUpdate(
      doctorId,
      { status: 'approved' },
      { new: true }
    );

    // Update user isDoctor field
    const user = await userSchema.findByIdAndUpdate(
      userid,
      { isDoctor: true },
      { new: true }
    );

    if (user) {
      user.notification.push({
        type: 'doctor-account-approved',
        message: 'Your Doctor account has been approved',
        onClickPath: '/notification',
      });

      await user.save();
    }

    return res.status(201).send({
      message: 'Successfully updated approval status of the doctor!',
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error('Error updating approval status:', error);
    return res.status(500).send({ message: 'Something went wrong', success: false });
  }
};


const getStatusRejectController = async (req, res) => {
  try {
    const { doctorId, status, userid } = req.body;
    const doctor = await docSchema.findOneAndUpdate(
      { _id: doctorId },
      { status }
    );

    const user = await userSchema.findOne({ _id: userid });

    user.notification.push({
      type: "doctor-account-rejected",
      message: `Your Doctor account has been ${status}`,
      onClickPath: "/notification",
    });

    user.isDoctor = false; // Ensure isDoctor is set to false

    await user.save();
    await doctor.save();

    console.log("Updated user isDoctor field: ", user.isDoctor); // Debug log

    return res.status(201).send({
      message: "Successfully updated rejection status of the doctor!",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log("Error updating rejection status: ", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const displayAllAppointmentController = async (req, res) => {
  try {
    const allAppointments = await appointmentSchema.find({});
    console.log("Fetched appointments: ", allAppointments); // Debug log
    return res.status(200).send({
      success: true,
      message: "Successfully fetched all appointments",
      data: allAppointments,
    });
  } catch (error) {
    console.log("Error fetching appointments: ", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

module.exports = {
  getAllDoctorsControllers,
  getAllUsersControllers,
  getStatusApproveController,
  getStatusRejectController,
  displayAllAppointmentController,
};
