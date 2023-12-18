const mongoose = require('mongoose');

const encounterSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  dateAndTime: { type: Date, default: Date.now },
  type: { type: String, enum: ['Emergency', 'OPD', 'Specialist Care'], required: true },
  vitals: {
    bloodPressure: { type: String },
    temperature: { type: String },
    pulse: { type: String },
    spo2: { type: String },
  },
});

module.exports = mongoose.model('Encounter', encounterSchema);
