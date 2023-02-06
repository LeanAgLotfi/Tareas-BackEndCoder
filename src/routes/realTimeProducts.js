const { Router } = require('express');
const uploader = require('../../utils');
const ProductManager = require('../dao/ProductManager/ProductManager');
const producto = require('../data/products.json');
let productManager = new ProductManager(producto);
const router = Router();

//real time products simple

router.get('/realtimeproducts', async (req, res)=>{
    const data = {
        producto: producto,
        title: 'Prodcutos en tiempo real simple'
    }
    res.render('realTimeProducts', data)
});

router.post('/realtimeproducts',(req, res)=>{
    const newProduct = req.body
    if(!newProduct){
        return res.status(400).send({
            error: 'No cargo el producto'
        })
    }
    const data = {
        producto: producto,
        title: 'Productos en tiempo real'
    }
    const prod = {
        ...req.body
    }
    producto.push(prod)
    res.render('realTimeProducts', data)
});

//home
router.get('/home', (req,res)=>{
    const data = {
        producto: producto,
        title: 'Este es el index'
    }
    return res.render('home', data)
});


module.exports = router;