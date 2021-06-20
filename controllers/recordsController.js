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
                return Record.populate(records, "provider");
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
    filter: (req, res, next) => {
        let providerId = req.query.provider,
            date = req.query.date,
            nameStarts = req.query.nameStarts,
            patientId = req.query.patient,
            diagnosis = req.query.diagnosis;
        var records = res.locals.records;

        if (providerId)
            records = records.filter(record => record.provider._id.equals(providerId));

        if (date) {
            records = records.filter(record => record.date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) === date)
                        .sort((a, b) => a.date - b.date);
        }

        if (nameStarts) {
            nameStarts = nameStarts.split(' ').map(name => name.toLowerCase());

            records = records.filter(record => {
                let firstName = record.patient.name.first.toLowerCase(),
                    lastName = record.patient.name.last.toLowerCase();
                if (nameStarts.length === 1) 
                    return firstName.startsWith(nameStarts[0]) || lastName.startsWith(nameStarts[0]);
                else {
                    let firstLastMatch = firstName.startsWith(nameStarts[0]) && lastName.startsWith(nameStarts[1]),
                        lastFirstMatch = firstName.startsWith(nameStarts[1]) && lastName.startsWith(nameStarts[0]);
                    return firstLastMatch || lastFirstMatch;
                }
            }).sort((a, b) => {
                if (a.patient.name.first != b.patient.name.first)
                    return a.patient.name.first.localeCompare(b.patient.name.first);
                else if (a.patient.name.last != b.patient.name.last)
                    return a.patient.name.last.localeCompare(b.patient.name.last);
                else if (!a.patient._id.equals(b.patient._id))
                    return a.patient.DOB - b.patient.DOB;
                else if (a.date != b.date)
                    return b.date - a.date;
                else if (a.provider.name.last != b.provider.name.last)
                    return a.provider.name.last.localeCompare(b.provider.name.last);
                else
                    return a.provider.name.first.localeCompare(b.provider.name.first);
            });
        }

        if (patientId) {
            records = records.filter(record => record.patient._id.equals(patientId))
                        .sort((a, b) => b.date - a.date);
        }

        if (diagnosis)
            records = records.filter(record => record.diagnoses.includes(diagnosis));

        res.locals.records = records;
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
                if (patientRecords.some(record => record.diagnoses.includes(diagnosis)))
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