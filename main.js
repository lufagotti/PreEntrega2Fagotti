const contenedorProductos = document.getElementById ('contenedor-productos')

let carrito = [];

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
  </div>
  </div>
  `;
  contenedorProductos.append(div)

  let comprar = document.createElement("button")
  comprar.innerText = "Agregar al carrito"
  comprar.classList.add ('comprar')
  div.append(comprar)

  comprar.addEventListener("click", () =>{
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
    });
    console.log(carrito)
  });
});