const router = require("express").Router(),
    recordsController = require("../controllers/recordsController"),
    patientsController = require("../controllers/patientsController");

router.get("/records", recordsController.index, recordsController.filter, recordsController.respondJSON);
router.patch("/records/:id/patch", recordsController.patch, recordsController.respondJSON);
router.patch("/records/:id/addDiagnosis/:diagnosis", recordsController.addDiagnosis, recordsController.respondJSON);
router.patch("/records/:id/removeDiagnosis/:diagnosis", recordsController.removeDiagnosis, recordsController.respondJSON);

router.get("/patients/:id", patientsController.show, patientsController.respondJSON);

module.exports = router;