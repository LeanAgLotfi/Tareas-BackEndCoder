const { Router } = require('express');
const ProductManager = require('../ProductManager/ProductManager');
const producto = require('../data/products.json');
let productManager = new ProductManager(producto);
const router = Router();

//pedir todos los productos
router.get("/", async (req, res) => {
    const products = await productManager.getProduct();
    const limit = Number(req.query.limit);
  
    if (isNaN(limit)) {
      res.status(400).send("el parametro debe ser un numero");
    } else {
      
        if(limit) {
            const limitProducts = products.slice(0, limit);
        res.json({
            status: "success",
            data: limitProducts,
            });
        }else{
            res.send({products});
        }
    }
  });
//crear producto
  router.post("/", async (req, res) => {
    const product = req.body;
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.status ||
      !product.category ||
      !product.thumbnails
    ) {
      res.status(400).send("Faltan completar campos");
    } else {
      res.json({
        status: "succes",
        data: await productManager.addProducto(product),
      });
    }
  });



  //pedir un producto
  router.get('/:pid', async (req, res) => {
    let pid = +req.params.pid;
    let product = await productManager.getProductById(pid)
    let status = product.id > 0 ? "success" : "error";
    res.send({ status: status, payload: product })
});

//actualizar
  router.put("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const fieldsToUpdate = req.body;
    const foundId = fieldsToUpdate.hasOwnProperty("id");
    const data = await productManager.updateProduct(pid, fieldsToUpdate)
    console.log(data)
  
    if (foundId) {
      res.status(400).send("no se puede modificar el id");
    } else {
      if(data){
        res.json({
          status: "succes",
          data: data
        });
      } else {
        res.status(400).send("Product Not Found")
      }
    }
  });


  //borrar
  router.delete("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
  
    if (isNaN(pid)) {
      res.status(400).send("Debes pasar un Numero");
    } else {
      res.json({
        status: "succes",
        data: await productManager.deleteProduct(pid),
      });
    }
  });

  module.exports = router;