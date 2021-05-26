const router = require("express").Router(),
    homeController = require("../controllers/homeController");

router.get("/", homeController.index);

module.exports = router;