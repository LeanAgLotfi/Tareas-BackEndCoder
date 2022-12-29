const { Router } = require("express");
const router = Router();
const productRoutes = require("./productsRoutes");
const cartRoutes = require("./cartRoutes");


router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.export = router;