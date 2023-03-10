//Express
const { Router } = require('express');

//const productModel = require('../../dao/Model/products.model');
//const auth = require('../../middleware/auth');
// const session = require('express-session');
// const fs = require('fs');

//PRODUCT AND CART MANAGER --- admin
const ProductManagerMongo = require('../../dao/MongoManagers/ProductsMongo');
const CartManagerMongo = require('../../dao/MongoManagers/CartsMongo');
const admin = require('../../data/admin.json');
const { sessionMiddleware } = require('../../middleware/session.middleware');
const { authMiddleware } = require('../../middleware/authorizeRedirect');
const  passportCustom  = require('../../middleware/passport-custom');
//PRODUCT AND CART MONGO 
const productMongoService = new ProductManagerMongo()
const cartMongoService = new CartManagerMongo()

//ROUTER
const router = Router()


//LOGIN--
router.get('/', (req, res)=>{
  res.redirect('/api/view/login')
})

router.get('/login', 
    sessionMiddleware,
    (req, res)=>{
        res.render('login', {
            title: 'Login',
        })
    }
)

//REGISTER--
router.get('/register', 
    sessionMiddleware,
    (req, res)=>{
    res.render('register', {
        title: 'Registrado!',
    })
})



//SESSION GET--
// router.get('/sessions', async(req, res)=>{
// const user = await req.session.user;

//      if(user){
//     const products = await productMongoService.getProducts(req.query)
//       return  res.render('index', {
//             title: "Bebidas E-commerce",
//             products: products.docs,
//         })
//   }else{ 
//         return res.render('login', {
//             title:'Registrar Usuario',
//         });
//     }
// });

// //SESSION POST
// router.post('/sessions', 
//   async (req, res)=>{
//     console.log(req.body);
//     const user = req.body; 
//     req.session.user = user;
//     req.session.save((err) => {
//         if (err) console.log("Session Error => ", err);
//         else res.redirect('/api/products');
//       })
// });

//PRODUCTOS
router.get('/products', 
    authMiddleware,
    passportCustom('jwt'),
  async (req, res) => {
    const user = req.user
    try {
        const products = await productMongoService.getProducts(req.query)
        res.render('index', {
            title: "Bebidas E-commerce",
            products: products.docs
        })
    }catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
});

//PERFIL
router.get('/profile', authMiddleware , async (req, res) => {
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

//CARRITO
router.get('/cart/:cid', 
  authMiddleware,
  passportCustom('jwt'),
async (req, res) => {
    const cartId = req.params.cid
    const user = req.user
    try {
        const cart = await cartMongoService.getCartById(cartId)
        res.render('cart', {
            title: "Carrito",
            user,
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

//CURRENT
// router.get('/current', 
//   passportCustom('jwt'),
//   authorization(USER_ROLES),
//     async (req,res)=>{
//     res.json({ payload:req.user });
//     },
//   );

//VIEW UNAUTHORIZED
router.get("/unauthorized", (req, res) => {
  res.render("unauthorized");
});

//LOGOUT
// router.get('/logout', auth, async(req,res)=>{
//     try {
//         req.session.destroy(err => {
//           if (err) {
//             console.log(err);
//           }
//           else {
//             res.clearCookie('user');
//             res.redirect('/api/sessions');
//           }
//         })
//       }
//       catch(err) {
//         console.log(err);
//       }
// });

module.exports = router;