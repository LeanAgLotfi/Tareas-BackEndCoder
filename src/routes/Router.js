const { Router } = require("express");
const router = Router();
const productRoutes = require("./Products/Router.Products");
const cartRoutes = require("./Cart/Router.Cart");


router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.export = router;