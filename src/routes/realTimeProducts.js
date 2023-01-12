const { Router } = require('express');
const uploader = require('../utils');
const ProductManager = require('../ProductManager/ProductManager');
const producto = require('../data/products.json');
let productManager = new ProductManager(producto);
const router = Router();

//home
router.get('/', async (res,req)=>{
    const products = await productManager.getProduct();
    
    const limit = Number(req.query.limit)
    if(!limit){
        return res.render('home',{
            products: products
        })
    }

    const limitedProducts = products.slice(0,limit)
    res.render('home',{
        products: limitedProducts
    })
    
});


//real time prod
router.get('/realtimeproducts', async (req, res)=>{
    const products = await productManager.getProduct()
    const limit = req.query.limit
    if(!limit){
        return res.render('realTimeProducts',{
            products: products
        })
    }
    const limitedProducts = products.slice(0,limit)
    res.render('realTimeProducts',{
        products: limitedProducts
    })
})


router.post('/realtimeproducts', uploader.array('files'), async (req, res)=>{
    const newProduct = req.body
    const socket = req.app.get('socket')
    if(!newProduct){
        return res.status(400).send({
            error: 'No cargo el producto'
        })
    }
    if(req.files){
        const paths = req.files.map(file => {
            return {
             path: file.path,
             originalName: file.originalname    
            }
        })
        newProduct.thumbnails = paths
    }
    socket.emit('newProduct', newProduct)
    res.send({
        status: 'success'
    })
})

module.exports = router;