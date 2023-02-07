const removeProduct = async (event) =>{
    const productId = event.target.parentNode.getAttribute('id')
    const cartId = event.target.parentNode.parentNode.getAttribute('id')
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE'
    })
    .then(alert('Bebida eliminada del carrito'))
    .then(window.location.href = window.location.href)
}
