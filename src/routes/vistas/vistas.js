const { Router } = require('express')
const productModel = require('../../dao/Model/products.model')
const ProductManagerMongo = require('../../dao/MongoManagers/ProductsMongo')
const CartManagerMongo = require('../../dao/MongoManagers/CartsMongo')

const router = Router()

const productMongoService = new ProductManagerMongo()
const cartMongoService = new CartManagerMongo()

router.get('/products', async (req, res) => {
    try {
        const products = await productMongoService.getProducts(req.query)
        res.render('index', {
            title: "Bebidas E-commerce",
            products: products.docs
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/cart/:cid', async (req, res) => {
    const cartId = req.params.cid 
    try {
        const cart = await cartMongoService.getCartById(cartId)
        res.render('cart', {
            title: "Carrito",
            products: cart.products,
            cartId: cart._id
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

module.exports = router