const fs = require('fs/promises')
const { existsSync } = require('fs');


class ProductManager{

    constructor(path){
        this.path = path
    }

async addProducto(producto){
    try{
        const productoSalvado = await this.getProduct();
        const verificar = productoSalvado.find(item => item.code == producto.code);
        const objProducto = Object.keys(producto);
        if(verificar){
            console.error(`Este codigo ya existe ${producto.code}`)
        }
        if(objProducto.length < 6){
            console.error('Faltan campos por completar');
        }
        const newId = productoSalvado.length > 0 ? productoSalvado[productoSalvado.length -1 ].id + 1 : 1
        const nuevoProducto = {
            id: newId, 
            ...producto
        }
        productoSalvado.push(nuevoProducto)
        const listaDeProductos = JSON.stringify(productoSalvado, null, '\t')
        await fs.writeFile(this.path, listaDeProductos)
        console.log(`${producto.title} añadido`)
    }catch(error){
        console.error(error);
    }
}

async getProduct(){
    try{
        if (existsSync(this.path)){
            const producto = await fs.readFile(this.path, 'utf-8')
            if(producto.length > 0){
                const parsedProducts = JSON.parse(producto)
                return parsedProducts
            }
            else return []
        }
        else return []
    }
    catch(error){
        console.error(error);
    }
}

async getProductById(id) {
    try{
        const productoSalvado = await this.getProduct();
        const productoSeleccionado = productoSalvado.find(prod => prod.id === id)
        if(!productoSeleccionado){
          console.error('No se encontro el id del producto');
        }
        return productoSeleccionado
    }
    catch(error){
        console.log(error)
    }
}

async updateProduct(id, product) {
    try{
        const productoGuardado = await this.getProduct()
        const productoSeleccionado = await this.getProductById(id)
        if(productoSeleccionado){
            const productoActualizado = {...productoSeleccionado, ...product}
            const listaActualizada = productoGuardado.map(prod =>{
                if(prod.id === id){
                    return productoActualizado
                }else{
                    return prod
                }
            })
            const stringDeProductos = JSON.stringify(listaActualizada, null, '\t')
            await fs.writeFile(this.path, stringDeProductos)
            console.log('producto modificado')
        }
    }
    catch(error){
        console.log(error)
    }
}

async deleteProduct(id) {
    try{
        const productoGuardado = await this.getProduct();
        const productoSeleccionado = await this.getProductById(id)
        const productoFiltrado = productoGuardado.filter(prod => prod.id !== id)
        if(!productoSeleccionado){
            console.error('ERROR: No se encuentra la id especificada')
        }
        else{
            const stringDeProductos = JSON.stringify(productoFiltrado, null, '\t')
            await fs.writeFile(this.path, stringDeProductos)
            console.log(`${productoSeleccionado.title} eliminado`)
        }
    }
    catch(error){
        console.log(error.message)
    }
}

//Carrito

async createCart() {
    let cart = await this.getProduct();
    const newCart = { id: cart.length + 1, products: [] };
    cart.push(newCart);
    await this.addProducto(cart);
    return cart;
  }

  async addToCart(cid, pid) {
    let cart = await this.getProduct();
    const order = cart.find((o) => o.orderId === cid);

    if (order) {
      const productExist = order.products.find((prod) => prod.prodId === pid);

      if (productExist) {
        const orderPosition = cart.findIndex((order) => order.orderId === cid);
        const updateProduct = cart[orderPosition].products.find(
          (prod) => prod.prodId === pid
        );
        const productPosition = cart[orderPosition].products.findIndex(
          (prod) => prod.prodId === pid
        );

        cart[orderPosition].products[productPosition].quantity =
          updateProduct.quantity + 1;
        await this.addProducto(cart);
        return cart;

      } else {
        const newProduct = { prodId: pid, quantity: 1 };
        const orderPosition = cart.findIndex((order) => order.orderId === cid);
        if (orderPosition <= 0) {
          cart[orderPosition].products.push(newProduct);
          await this.addProducto(cart);
          return cart;
        }
      }
    } else {
      const newOrder = {
        orderId: cart.length + 1,
        products: [{ prodId: pid, quantity: 1 }],
      };
      cart.push(newOrder);
      await this.addProducto(cart);
      return cart;
    }
  }

}

module.exports = ProductManager;