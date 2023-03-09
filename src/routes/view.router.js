const { Router } = require("express");
const router = Router();
const credentials = require('../routes/vistas/vistas')
const sessionRoutes = require('../routes/session/session.routes')

router.use("/session", sessionRoutes);
router.use("/view", credentials);

module.exports = router;


