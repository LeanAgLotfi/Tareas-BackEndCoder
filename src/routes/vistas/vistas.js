const { Router } = require('express');
const productModel = require('../../dao/Model/products.model');
const ProductManagerMongo = require('../../dao/MongoManagers/ProductsMongo');
const CartManagerMongo = require('../../dao/MongoManagers/CartsMongo');
const auth = require('../../middleware/auth');
const router = Router()
const admin = require('../../data/admin.json');
const productMongoService = new ProductManagerMongo()
const cartMongoService = new CartManagerMongo()


router.get('/sessions', async(req, res)=>{
const user = await req.session.user;

     if(user){
    const products = await productMongoService.getProducts(req.query)
      return  res.render('index', {
            title: "Bebidas E-commerce",
            products: products.docs,
        })
  }else{ 
        return res.render('login', {
            title:'Registrar Usuario',
        });
    }
})
 router.post('/sessions', async (req, res)=>{
    console.log(req.body);
    const user = req.body; 
    req.session.user = user;
    req.session.save((err) => {
        if (err) console.log("Session Error => ", err);
        else res.redirect('/api/products');
      })
 });

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

router.get('/profile', auth, async (req, res) => {
    const user = await req.session.user;
    const registrado = admin.find(admin => admin.email === user.email);
    if(registrado){
        res.render('profile', {
            title: 'Perfil admin',
            last_name: registrado.last_name,
            first_name: registrado.first_name,
            img:'https://res.cloudinary.com/dsoa7ssat/image/upload/v1676049821/bebidas/engranaje_pqmnak.png',
            campo: 'Admin'
        });
    }
    else if(user){
           res.render('profile', {
            title:'Perfil',
            last_name: user.last_name,
            first_name: user.first_name,
            img:'https://res.cloudinary.com/dsoa7ssat/image/upload/v1676049815/bebidas/user-normal_conv_mucz2p.jpg',
            campo: 'user'
    });
    }
    else{
      return res.render('unauthorized', {
            title:'No autorizado',
        }).res.status(401);
    }
});

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
});


module.exports = router