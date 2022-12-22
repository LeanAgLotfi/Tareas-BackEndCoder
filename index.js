const express = require('express');
const app = express();
const productManager = require('./ProductManager/ProductManager');
const productos = require('./data/products.json');
const prod = new productManager(productos);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.listen(8080, () => console.log('Server is up and running on port 8080'))
app.get('/products', async (req,res)=>{
    console.log('Mostrar Productos');
    res.send(prod);
})
app.get('/products/:pid', async (req, res)=>{
    console.log(req.params);
    const prodId = req.params.pid;
    const id = productos.find(prod => prod.id === +prodId);
    if (!id) {
      return res.status(404).send("Product not found");
    }
    res.send({id});
})
app.get('/products', async (req, res)=>{
    console.log(req.query);
    let products = await prod.getProduct();
    let limit = req.query.limit;
        if (!limit) return res.send({ status: "success", payload: products });
        let productLimit = productos.filter((product, indice) => indice < limit);
        res.send({ status: "success", payload: productLimit })
})
