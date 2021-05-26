const mongoose = require("mongoose"),
    Patient = require("./models/patient");

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/docucare",
    { useNewUrlParser: true }
);

Patient.remove({})
    .then(() => {
        return Patient.create({
            name: {
                first: "Erika",
                last: "Wright"
            },
            gender: "female",
            DOB: new Date('1995, 11, 7')
        });
    })
    .then(patient => console.log(patient.fullName))
    .then(() => {
        return Patient.create({
            name: {
                first: "Paul",
                last: "Mitchell"
            },
            gender: "male",
            DOB: new Date('1987, 8, 13')
        });
    })
    .then(patient => console.log(patient.fullName))
    .then(() => {
        return Patient.create({
            name: {
                first: "Felicia",
                last: "Escobar"
            },
            gender: "female",
            DOB: new Date('1996, 2, 1')
        });
    })
    .then(patient => console.log(patient.fullName))
    .then(() => {
        return Patient.create({
            name: {
                first: "Marcus",
                last: "Henry"
            },
            gender: "male",
            DOB: new Date('1978, 12, 11')
        });
    })
    .then(patient => console.log(patient.fullName))
    .then(() => {
        return Patient.create({
            name: {
                first: "Celine",
                last: "Fontes"
            },
            gender: "female",
            DOB: new Date('2001, 5, 13')
        });
    })
    .then(patient => console.log(patient.fullName))
    .then(() => {
        return Patient.create({
            name: {
                first: "Bonnie",
                last: "Emerson"
            },
            gender: "female",
            DOB: new Date('1990, 4, 15')
        });
    })
    .then(patient => console.log(patient.fullName))
    .catch(error => console.log(error.message))
    .then(() => {
        console.log("DONE");
        mongoose.connection.close();
    });