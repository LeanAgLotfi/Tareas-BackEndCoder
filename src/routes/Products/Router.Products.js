const {Router} = require('express');
const router = Router();
const productManager = require('./src/ProductManager/ProductManager');
const productos = require('./data/products.json');
const prod = new productManager(productos);

router.get("/", async (req, res) => {
    const products = await prod.getItems();
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
            res.send({productos});
        }
    }
  });


  router.get('/:pid', async (req, res)=>{
    console.log(req.params);
    const prodId = req.params.pid;
    const id = productos.find(prod => prod.id === +prodId);
    if (!id) {
      return res.status(404).send("Product not found");
    }
    res.send({id});
});


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
        data: await prod.addProducto(product),
      });
    }
  });

  router.put("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const fieldsToUpdate = req.body;
    const foundId = fieldsToUpdate.hasOwnProperty("id");
    const data = await prod.updateProduct(pid, fieldsToUpdate)
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

  router.delete("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
  
    if (isNaN(pid)) {
      res.status(400).send("Debes pasar un Numero");
    } else {
      res.json({
        status: "succes",
        data: await prod.deleteProduct(pid),
      });
    }
  });