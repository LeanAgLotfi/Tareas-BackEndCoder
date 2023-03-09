const { Router } = require("express");
const productRoutes = require("../utils/old/productsRoutes");
const cartRoutes = require("../utils/old/cartRoutes");
const router = Router();

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;