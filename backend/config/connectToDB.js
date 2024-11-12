const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/DoctorAppointmentDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Exit the process if the connection fails
    process.exit(1); 
  }
};

module.exports = connectToDB; // Use module.exports for CommonJS
