const productItem = document.querySelector('.product-item')
const addToCartButton = document.getElementById('add-to-cart-button')

let currentCart;

const addToCart = async (event) =>{
    if(!currentCart){
        await fetch('/cart',{method: 'POST'})
        .then(response => response.json())
        .then(data => currentCart = data.cart._id);
    }
    productId = event.target.parentNode.getAttribute('id')
    fetch(`/cart/${currentCart}/product/${productId}`, {
      headers: {
        'Content-Type': 'application/json'
    },
        method: 'POST'
    })
    .then(Toastify({

        text: "Agregado al carrito!!",
        
        duration: 6000,
        offset: {
            x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        position: "rigth",
        style: {
            background: "linear-gradient(to right, #25EA7C, #6DEA25)",
          }
        }).showToast()
        )
}

const seeCart = async (event) =>{
    if(!currentCart){
        return Toastify({

            text: "El carrito esta vacio",
            
            duration: 6000,
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            style: {
                background: "linear-gradient(to right, #D8261F, #F0635E)",
              }
            }).showToast();
    }
    window.location.href = `/api/view/cart/${currentCart}`
}