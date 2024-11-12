const mongoose = require('mongoose');

const appointmentSchemaDefinition = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: String, required: true },
  userInfo: { type: Object, required: true }, // Ensure this is set to Object
  doctorInfo: { type: Object, required: true },
  status: { type: String, default: 'pending' },
  document: {
    data: Buffer,
    contentType: String,
    filename: String 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 0 }
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchemaDefinition);

module.exports = Appointment;
