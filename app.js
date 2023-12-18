const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./db'); // Connect to MongoDB
const Patient = require('./models/Patient');
const Encounter = require('./models/Encounter');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// API to register a patient
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to start an encounter for a patient
app.post('/encounters', async (req, res) => {
  try {
    const encounter = new Encounter(req.body);
    await encounter.save();
    res.status(201).send(encounter);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to submit patient vitals
app.post('/vitals', async (req, res) => {
  try {
    const patientID = req.body.patientID;
    const encounter = await Encounter.findOne({ patientID }).sort({ dateAndTime: -1 }).limit(1);

    if (!encounter) {
      return res.status(404).send({ error: 'No encounter found for the patient' });
    }

    encounter.vitals = req.body.vitals;
    await encounter.save();

    res.status(200).send(encounter);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to get a list of patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API to get details of a specific patient
app.get('/patients/:patientID', async (req, res) => {
  try {
    const patientID = req.params.patientID;
    const patient = await Patient.findOne({ patientID }).populate('encounters');
    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
