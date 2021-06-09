const Record = require("../models/record"),
    Patient = require("../models/patient"),
    httpStatus = require("http-status-codes");

module.exports = {
    index: (req, res, next) => {
        Record.find({})
            .then(records => {
                return Record.populate(records, "patient");
            })
            .then(records => {
                res.locals.records = records;
                next();
            })
            .catch(error => {
                console.log(`Error fetching records: ${error.message}`)
                next(error);
            });
    },
    filterByDate: (req, res, next) => {
        let date = req.params.date,
            filteredRecords = res.locals.records.filter(record => {
                return (record.date.toDateString() === date);
            });
        filteredRecords.sort((a, b) => a.date - b.date);
        res.locals.records = filteredRecords;
        next();
    },
    filterByPatient: (req, res, next) => {
        let patientId = req.params.patient,
            filteredRecords = res.locals.records.filter(record => record.patient._id.equals(patientId));
        filteredRecords.sort((a, b) => b.date - a.date);
        res.locals.records = filteredRecords;
        next();
    },
    patch: (req, res, next) => {
        let recordId = req.params.id,
            recordParam = req.body;
        Record.findByIdAndUpdate(recordId, {
            $set: recordParam
        })
        .then(newRecord => {
            res.locals.record = newRecord;
            res.locals.success = true;
            next();
        })
        .catch(error => {
            console.log(`Error updating record: ${error.message}`)
            next(error);
        });
    },
    addDiagnosis: (req, res, next) => {
        let recordId = req.params.id,
            diagnosis = req.params.diagnosis;
        Record.findByIdAndUpdate(recordId, {
            $addToSet: { diagnoses: diagnosis }
        })
        .then(updatedRecord => {
            res.locals.record = updatedRecord;
            return Patient.findByIdAndUpdate(updatedRecord.patient, {
                $addToSet: { diagnoses: diagnosis }
            });
        })
        .then(updatedPatient => {
            res.locals.patient = updatedPatient;
            res.locals.success = true;
            next();
        })
        .catch(error => {
            console.log(`Error updating record: ${error.message}`)
            next(error);
        });
    },
    removeDiagnosis: (req, res, next) => {
        let recordId = req.params.id,
            diagnosis = req.params.diagnosis;
        Record.findByIdAndUpdate(recordId, {
            $pull: { diagnoses: diagnosis }
        })
        .then(updatedRecord => {
            res.locals.record = updatedRecord;
            return Record.find({ patient: updatedRecord.patient });
        })
        .then(patientRecords => {
            var diagnosisExists = false;
            patientRecords.forEach(record => {
                if (record.diagnoses.includes(diagnosis))
                    diagnosisExists = true; 
            });
            if (diagnosisExists)
                next();
            else {
                let patientId = patientRecords[0].patient;
                return Patient.findByIdAndUpdate(patientId, {
                    $pull: { diagnoses: diagnosis }
                });
            }
        })
        .then(updatedPatient => {
            res.locals.patient = updatedPatient;
            res.locals.success = true;
            next();
        })
        .catch(error => {
            console.log(`Error updating record: ${error.message}`)
            next(error);
        });
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    }
};