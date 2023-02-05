const contenedorProductos = document.getElementById ('contenedor-productos')
const carritoContenedor = document.querySelector ('#carrito-contenedor')
const vaciarCarrito = document.querySelector ('#vaciar-carrito')
const precioTotal = document.querySelector ('#precio-total')

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
})

productos.forEach((producto)=> {
  let div = document.createElement ("div");
  div.classList.add ('producto')
  div.innerHTML = `
  <div class="card" style="width: 18rem;">
    <img src=${producto.img} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <p class="preciongr"> $ ${producto.precio}</p>
      <button onclick="agregarProducto(${producto.id})"  type="button" class="btn btn-primary">Agregar al carrito</button>
    </div>
  </div>
  `;
  contenedorProductos.append(div)
});

vaciarCarrito.addEventListener('click', () => {
  carrito.length = []
  mostrarCarrito()
})

function agregarProducto(id){
  const existe = carrito.some(prod => prod.id === id)
  if(existe){
    const prod = carrito.map (prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  }else{
    const item = productos.find((prod)=> prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector('.modal .modal-body')
  modalBody.innerHTML = ''
  carrito.forEach((prod) => {
    const {id,nombre,precio,img,cantidad} = prod
    modalBody.innerHTML +=`
    <div class= "modal-contenedor">
      <div>
        <img class="img-fluid img-carrito" src= "${img}"></img>
      </div>
      <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: $ ${precio}</p>
        <p>Cantidad: ${cantidad}</p>
        <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar</button>
      </div>
    <div></div>
    </div>
    `
  })
  if(carrito.length === 0){
    modalBody.innerHTML = `
    <h5 class= "text-center">Tu carrito esta vacio</h5>
    `
  }
  carritoContenedor.textContent = carrito.length

  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0 )

  guardarStorage()
}

function eliminarProducto(id){
  const productoId = id
  carrito = carrito.filter((producto) => producto.id !== productoId)
  mostrarCarrito()
}

function guardarStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}