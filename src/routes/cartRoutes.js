const {Router} = require('express');
const CartManager = require('../ProductManager/CartManager');
const router = Router();

const cart = require('../data/cart.json');
const cartManager = new CartManager(cart);


//Create Cart
router.post('', async (req, res) => {
    let newCart = await cartManager.addCart()
    let status = newCart.includes("is load") ? "success" : "error";
    res.send({ status: status, message: newCart })
});


router.get('', async (req, res) => {
    let carts = await cartManager.getCarts()
    let limit = req.query.limit;
    if (!limit) return res.send({ status: "success", payload: carts });

    let cartLimit = carts.filter((cart, indice) => indice < limit);

    res.send({ status: "success", payload: cartLimit })

})


router.get('/:cid', async (req, res) => {
    let cid = +req.params.cid;
    let cart = await cartManager.getCartById(cid)
    let productsCart = cart.products
    let status = cart.id > 0 ? "success" : "error";
    let message = cart.id > 0 ? productsCart : cart;
    res.send({ status: status, payload: message })
});


router.post('/:cid/products/:pid', async (req, res) => {
    let cid = +req.params.cid
    let pid = +req.params.pid
    let quantity = req.query.q
    !quantity ? quantity = 1 : quantity = quantity
    let addProduct = await cartManager.addProductToCart(cid, pid, quantity);
    let status = addProduct.includes("product id") ? "success" : "error";
    res.send({ status: status, message: addProduct })
});


router.delete('/:cid/products/:pid', async (req, res) => {
    let cid = +req.params.cid
    let pid = +req.params.pid
    let deleteProduct = await cartManager.deleteProductToCart(cid, pid);
    let status = deleteProduct.includes("product id") ? "success" : "error";
    res.send({ status: status, message: deleteProduct })
});


router.delete('/:pid', async (req, res) => {
    let pid = +req.params.pid
    let cartDelete = await cartManager.deleteCart(pid);
    let status = cartDelete.includes("removed cart") ? "success" : "error";
    res.send({ status: status, message: cartDelete })
});

module.exports = router;