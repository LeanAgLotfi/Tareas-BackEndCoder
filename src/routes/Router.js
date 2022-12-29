const { Router } = require("express");
const productRoutes = require("./productsRoutes");
const cartRoutes = require("./cartRoutes");
const router = Router();

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;