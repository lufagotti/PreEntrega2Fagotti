const productos = [
  { id :1, nombre:"Protector solar", precio: 3500, img: './imagenes/producto1.jpg', cantidad: 1},
  { id: 2, nombre:"Protector solar", precio: 1800, img: './imagenes/producto2.jpg', cantidad: 1},
  { id: 3, nombre:"Protector solar", precio: 2850, img: './imagenes/producto3.jpg', cantidad: 1},
  { id: 4, nombre: "Crema hidratante", precio: 2200, img: './imagenes/producto4.jpg', cantidad: 1},
  { id: 5, nombre: "Crema hidratante", precio: 2400, img: './imagenes/producto5.jpg', cantidad: 1},
  { id: 6, nombre: "Crema hidratante", precio: 1450, img: './imagenes/producto6.jpg', cantidad: 1},
  { id: 7, nombre: "Agua micelar", precio: 1570, img: './imagenes/producto7.jpeg', cantidad: 1},
  { id: 8, nombre: "Agua micelar", precio: 1100, img: './imagenes/producto8.jpg', cantidad: 1},
  { id: 9, nombre: "Agua micelar", precio: 1790, img: './imagenes/producto9.jpg', cantidad: 1},
  { id: 10, nombre: "Serum", precio: 4200, img: './imagenes/producto10.jpg', cantidad: 1},
  { id: 11, nombre: "Serum", precio: 3300, img: './imagenes/producto11.jpeg', cantidad: 1},
  { id: 12, nombre: "Serum", precio: 2900, img: './imagenes/producto12.jpg', cantidad: 1},
];

let carrito = [];

const contenedor = document.querySelector ('#contenedor')
const carritoContenedor = document.querySelector ('#carritoContenedor')
const vaciarCarrito = document.querySelector ('#vaciarCarrito')
const precioTotal = document.querySelector ('#precioTotal')
const procesarCompra = document.querySelector ('#procesarCompra')
const activarFuncion = document.querySelector ('#activarFuncion')
const totalProceso = document.querySelector ('#totalProceso')
const formulario = document.querySelector ('#procesar-pago')

if(activarFuncion){
activarFuncion.addEventListener('click',  procesarPedido)
}

if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}

document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
  if(activarFuncion){
  document.querySelector('#activarFuncion').click(procesarPedido)
  }
})

productos.forEach((prod)=> {
  const {id, nombre, precio, img} = prod
  if(contenedor){
  contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
      <img src=${img} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <p class="preciongr"> $ ${precio}</p>
        <button onclick="agregarProducto(${id})"  type="button" class="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
    `
  }
});

if(procesarCompra){
procesarCompra.addEventListener('click', () => {
  if (carrito.length === 0){
      Swal.fire({
      icon: 'error',
      title: 'Tu carrito esta vacio',
      text: 'Compra algo para continuar con la compra',
      confirmButtonText: 'Aceptar'
    })
  }else{
    location.href = "compra.html"
    procesarPedido ()
  }
})
}

if(vaciarCarrito){
vaciarCarrito.addEventListener('click', () => {
  carrito.length = []
  mostrarCarrito()
})
}

function agregarProducto(id){
  const existe = carrito.some(prod => prod.id === id)
  if (existe){
    const prod = carrito.map (prod =>{
      if (prod.id === id){
        prod.cantidad++
      }
    })
  }else{
    const item = productos.find ((prod) => prod.id === id)
    carrito.push(item)
  }
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se agrego al carrito',
    showConfirmButton: false,
    timer: 1000
  })
  mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector ('.modal .modal-body')
  if(modalBody){
  modalBody.innerHTML = ''
  carrito.forEach ((prod) => {
    const {id, nombre, img, cantidad, precio} = prod
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
  }
  if (carrito.length === 0){
    modalBody.innerHTML = `
    <h5 class= "text-center">Tu carrito esta vacio</h5>
    `
  }
  if(carritoContenedor){
  carritoContenedor.textContent = carrito.length
  }
  if(precioTotal){
  precioTotal.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  }
  guardarStorage()
}

function eliminarProducto (id){
  const productoId = id
  carrito = carrito.filter((producto) => producto.id !== productoId)
  mostrarCarrito()
}

function guardarStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function procesarPedido(){
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector ('#lista-compra tbody')
    const {id, nombre, precio, cantidad, img} = prod
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>$${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

function enviarCompra(e){
  e.preventDefault()
  const persona = document.querySelector('#persona').value
  const correo = document.querySelector('#correo').value
  if(correo === '' || persona === ''){
      Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
  })
  } else {
    const btn = document.getElementById('button');

    // document.getElementById('form')
    // .addEventListener('submit', function(event) {
    // event.preventDefault();
    
    btn.value = 'Enviando...';
    
    const serviceID = 'default_service';
    const templateID = 'template_1me4en2';
    
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.value = 'Finalizar compra';
          // alert('Enviado!');
        }, (err) => {
          btn.value = 'Finalizar compra';
          alert(JSON.stringify(err));
        });
      };
    if (correo != '' & persona != ''){
      const spinner = document.querySelector ('#spinner')
      spinner.classList.add('d-flex')
      spinner.classList.remove('d-none')
  
      setTimeout(() => {
        spinner.classList.remove('d-flex')
        spinner.classList.add('d-none')
        formulario.reset()
      }, 3000)
  
      const alertExito = document.createElement('p')
      alertExito.classList.add('alert', 'd-block', 'text-center', 'col-md-12', 'mt-2', 'alert-success')
      alertExito.textContent = "Compra realizada correctamente"
      formulario.appendChild(alertExito)
  
      setTimeout(() => {
        alertExito.remove()
      }, 3000)
    }
    localStorage.clear()
  }
