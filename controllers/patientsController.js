const Patient = require("../models/patient"),
    httpStatus = require("http-status-codes");

module.exports = {
   show: (req, res, next) => {
        let patientId = req.params.id;
        Patient.findById(patientId)
            .then(patient => {
                res.locals.patient = patient;
                next();
            })
            .catch(error => {
                console.log(`Error fetching patient by ID: ${error.message}`);
                next(error);
            });
   },
   respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    }
}