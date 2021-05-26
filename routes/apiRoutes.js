const router = require("express").Router(),
    recordsController = require("../controllers/recordsController");

router.get("/records/dates/:date", recordsController.index, recordsController.filterByDate, recordsController.respondJSON);
router.get("/records/patients/:patient", recordsController.index, recordsController.filterByPatient, recordsController.respondJSON);
router.patch("/records/:id/update", recordsController.update, recordsController.respondJSON);

module.exports = router;