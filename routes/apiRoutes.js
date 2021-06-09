const router = require("express").Router(),
    recordsController = require("../controllers/recordsController");

router.get("/records/dates/:date", recordsController.index, recordsController.filterByDate, recordsController.respondJSON);
router.get("/records/patients/:patient", recordsController.index, recordsController.filterByPatient, recordsController.respondJSON);
router.patch("/records/:id/patch", recordsController.patch, recordsController.respondJSON);
router.patch("/records/:id/addDiagnosis/:diagnosis", recordsController.addDiagnosis, recordsController.respondJSON);
router.patch("/records/:id/removeDiagnosis/:diagnosis", recordsController.removeDiagnosis, recordsController.respondJSON);

module.exports = router;