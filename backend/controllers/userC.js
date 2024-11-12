const User = require("../models/userModel.js");
const Doc = require("../models/docModel.js");
const Appointment = require("../models/appointmentModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// User Registration
const registerController = async (req, res) => {
  const { fullName, email, password, phone, type } = req.body;

  if (!fullName || !email || !password || !phone || !type) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      type,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// User Login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required", success: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Doctor Registration
const registerDoctorController = async (req, res) => {
  console.log("Request body received:", req.body);
  const { fullName, email, phone, address, specialization, experience, fees, timings } = req.body.doctor;
  const userId = req.userId; // Use the userId from the middleware

  console.log(fullName);
  console.log(email);
  console.log(phone);
  console.log(address);
  console.log(specialization);
  console.log(experience);
  console.log(fees);
  console.log(timings);


  if (!fullName || !email || !phone || !address || !specialization || !experience || !fees || !timings) {
    console.log("Missing fields in the request");
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found", success: false });
    }

    const newDoctor = new Doc({
      userId,
      fullName,
      email,
      phone,
      address,
      specialization,
      experience,
      fees,
      timings,
    });

    await newDoctor.save();
    user.isDoctor = true;
    await user.save();

    console.log("Doctor registered successfully for user:", userId);
    res.status(201).json({ success: true, message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Doctor registration error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Get All Doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doc.find({});
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error("Fetching doctors error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Book Appointment
const bookAppointmentController = async (req, res) => {
  console.log("****I need data****");
  console.log(req.body)
  const { userId, doctorId, date, userInfo, doctorInfo } = req.body;
  const file = req.file;
  console.log("***From backend***");
  console.log(userId);
  console.log(doctorId);
  console.log(date);
  console.log(userInfo);
  console.log(doctorInfo);
  console.log("File: ", file);

  if (!userId || !doctorId || !date || !userInfo || !doctorInfo || !file) { 
    return res.status(400).json({ message: "All fields are required", success: false }); 
  }

  try {

    const appointment = new Appointment({
      userId,
      doctorId,
      date,
      userInfo: JSON.parse(userInfo),
      doctorInfo: JSON.parse(doctorInfo),
      status: 'pending',
    });

    console.log("****appoint data***");
    console.log(appointment);

    if (req.file) {
      appointment.document = file.buffer; // Save the file buffer to the appointment 
      }

      await appointment.save(); 
      console.log("Appointment created with userId:", userId); // Log userId 
      console.log("Appointment created:", appointment); // Log the appointment
      res.status(201).json({ success: true, message: "Appointment booked successfully", data: appointment }); 
    } catch (error) { 
      console.error("Booking appointment error:", error); 
      res.status(500).json({ message: "Something went wrong", success: false }); 
    } 
  };

// Get User Data
const getUserDataController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Fetching user data error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Mark All Notifications as Read 
const markAllNotificationsReadController = async (req, res) => { 
  try { 
    const user = await User.findById(req.body.userId); 
    if (!user) { 
      return res.status(404).json({ message: "User not found", success: false }); 
    } 
    
    user.seennotification = user.seennotification.concat(user.notification); 
    user.notification = []; 
    await user.save(); 

    res.status(200).json({ success: true, message: "All notifications marked as read" });
   } catch (error) { 
    console.error("Mark all notifications read error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  } 
}; 

// Delete All Notifications 
const deleteAllNotificationsController = async (req, res) => { 
  try { 
    const user = await User.findById(req.body.userId); 
    if (!user) { 
      return res.status(404).json({ message: "User not found", success: false }); 
    } 
    
    user.seennotification = []; 
    await user.save(); 
    
    res.status(200).json({ success: true, message: "All notifications deleted" }); 
  } catch (error) { 
    console.error("Delete all notifications error:", error); 
    res.status(500).json({ message: "Something went wrong", success: false }); 
  } 
}; 

const getUserAppointmentsController = async (req, res) => {
  try {
    console.log(req);
    const userId = req.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    console.log("Fetching appointments for userId:", userId);

    // const User = mongoose.model('User');  

    // console.log("****USer****");
    // console.log(User);

    // // Find the user document based on the userInfo._id field
    // const user = await User.findOne({ "_id": '672e2fe23377ea0d6128cd83' });
    // console.log("USerrrrr");
    // console.log(user);

    // if (user) {
    //   // Return the userId field from the found user document
    //   console.log('userId:', user.userId);  // This is the userId field
    //   return user.userId;
    // } else {
    //   console.log('No user found with the given userInfo._id');
    //   return null;
    // }

    //console.log("Fetching appointments for userId:", userId); // Log userId
   // console.log("Type of userId:", typeof userId); 
    
    // Log type of userId for verification

    const appointmentSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      // other fields
  });


  const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);



  console.log("***Appointment****");
  console.log(appointmentSchema);

 
  const appointments = await Appointment.find({ "userInfo._id": userId })
  .populate("doctorId", "fullName email phone");
     console.log(typeof userId, userId);
    //const appointments = await Appointment.find({ userId: req.user.id });
    console.log("Appointments fetched:", appointments); // Log appointments for debugging



    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ message: "No appointments found", success: false });
    }

    return res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments
    });

  } catch (error) {
    console.log("Error fetching appointments:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};



/*const getUserAppointmentsController = async (req, res) => {
  try {
    const doctorId = req.userId;
    if (!doctorId) {
      return res.status(400).send({ message: "Doctor ID is required" });
    }

    console.log("Fetching appointments for doctorId (as string):", doctorId);
    console.log("Doctor ID type:", typeof doctorId);

    // Fetch appointments where the doctorId matches (keeping it as a string)
    const appointments = await Appointment.find({ doctorId: doctorId })
      .populate("doctorId", "fullName email phone");

    console.log("Appointments fetched:", appointments);
    console.log("Appointments length:", appointments.length);

    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ message: "No appointments found", success: false });
    }

    return res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments
    });

  } catch (error) {
    console.log("Error fetching appointments:", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};

*/


module.exports = { registerController, loginController, registerDoctorController, getAllDoctorsController, bookAppointmentController, getUserDataController, markAllNotificationsReadController, deleteAllNotificationsController, getUserAppointmentsController};

