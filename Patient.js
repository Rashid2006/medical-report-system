const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  otherNames: { type: String },
  gender: { type: String, required: true },
  phoneNumber: { type: String },
  residentialAddress: { type: String },
  emergencyName: { type: String },
  emergencyContact: { type: String },
  relationship: { type: String },
  encounters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' }],
});

module.exports = mongoose.model('Patient', patientSchema);
