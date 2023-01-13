const socket = io();

const form = document.getElementById('agregar-al-form')
const productListContainer = document.getElementById('productosContenedor')

form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(form)
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'manual'
    }

    fetch('http://localhost:8080/realtimeproducts',requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))

    form.reset()
})

socket.on('getProduct', data => {
    console.log('prueba' + data);
})

socket.on('newProduct', data => {
    const newProductFragment = document.createElement('div')
    if(!data.thumbnails.length){
        newProductFragment.innerHTML = `
        <div>
            <tr>
            <td>${data.id}</td>
            <td>${data.title}</td>
            <td>${data.price}</td>
            <td>${data.descripcion}</td>
            </tr>
        </div>`
    }else{
        newProductFragment.innerHTML = `
        <div>
        <tr>
            <td>${data.id}</td>
            <td>${data.title}</td>
            <td>${data.price}</td>
            <td>${data.descripcion}</td>
        </tr>
        </div>`
    }
    
    productListContainer.append(newProductFragment)
})