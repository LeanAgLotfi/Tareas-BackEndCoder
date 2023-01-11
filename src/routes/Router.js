const { Router } = require("express");
const productRoutes = require("./productsRoutes");
const cartRoutes = require("./cartRoutes");
const home = require('./realTimeProducts');
const router = Router();

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/home", home);
module.exports = router;