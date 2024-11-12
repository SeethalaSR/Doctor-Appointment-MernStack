const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./config/connectToDB");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const multer = require("multer"); 
const path = require("path");

const app = express();
dotenv.config();

connectToDB();

const PORT = process.env.PORT || 8000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000", // Update to match your frontend URL
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204
}));

//app.options('*', cors()); // Enable pre-flight requests for all routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



