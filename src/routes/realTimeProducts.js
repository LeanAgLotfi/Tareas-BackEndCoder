const { Router } = require('express');
const uploader = require('../utils');
const ProductManager = require('../ProductManager/ProductManager');
const producto = require('../data/products.json');
let productManager = new ProductManager(producto);
const router = Router();

//home
router.get('/home', async (res,req)=>{
    const products = await productManager.getProducts();
    
    const data ={
        list: products
    };
   
    res.render('home', data)
    
});


//real time prod
router.get('/realtimeproducts', async (req, res)=>{
    const products = await productManager.getProducts()
     res.render('realTimeProducts',{
            list: products,
            title: 'Real Time Products'
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