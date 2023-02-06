const productItem = document.querySelector('.product-item')
const addToCartButton = document.getElementById('add-to-cart-button')

let currentCart;

const addToCart = async (event) =>{
    if(!currentCart){
        await fetch('/api/cart',{method: 'POST'})
        .then(response => response.json())
        .then(data => currentCart = data.cart._id);
    }
    productId = event.target.parentNode.getAttribute('id')
    fetch(`/api/cart/${currentCart}/product/${productId}`, {
        method: 'POST'
    })
    .then(alert('Bebida agregada al carrito'))
}


const seeCart = async (event) =>{
    if(!currentCart){
        return alert('carrito vacio')
    }
    window.location.href = `/cart/${currentCart}`
}