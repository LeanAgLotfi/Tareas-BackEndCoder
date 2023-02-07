const removeProduct = async (event) =>{
    const productId = event.target.parentNode.getAttribute('id')
    const cartId = event.target.parentNode.parentNode.getAttribute('id')
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE'
    })
    .then(Toastify({

        text: "eliminado del carrito",
        
        duration: 8000,

        offset: {
            x: 30, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 80 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
          style: {
            background: "linear-gradient(to right, #D8261F, #F0635E)",
          }
        }).showToast())
    .then(window.location.href = window.location.href)
}
