const router = require("express").Router(),
    homeRoutes = require("./homeRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;