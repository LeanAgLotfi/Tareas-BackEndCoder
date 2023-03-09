const removeProduct = async (event) =>{
    const productId = event.target.parentNode.getAttribute('id')
    const cartId = event.target.parentNode.parentNode.getAttribute('id')
    await fetch(`/api/view/cart/${cartId}/product/${productId}`, {
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
    .then(()=>alert('item deleted from cart'))
    .then(window.location.href = window.location.href)
}

const clearCart = async(event) =>{
  const cartId = event.target.parentNode.getAttribute('id')
  await fetch(`/api/view/carts/${cartId}`,{
      method: 'delete'
  })
  .then(()=>alert('Cart cleared'))
  .then(()=>window.location.href = window.location.href)
}
