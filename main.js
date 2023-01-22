class Producto {
    constructor (nombre,precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}
const productos = []
productos.push (new Producto ( "protector solar", "3500"));
productos.push (new Producto ("crema hidratante", "2200"));
productos.push (new Producto ("agua micelar", "1000"));
productos.push (new Producto ("contorno de ojos", "800"))

let carrito = []

let solicitarProducto = prompt ("¿Desea comprar un producto?")

while ((solicitarProducto != "si") && (solicitarProducto != "no")){
    alert ("Por favor ingrese si o no")
    solicitarProducto = prompt ("¿Desea comprar un producto?")
}

if (solicitarProducto == "si"){
    alert ("A continuacion te muestro la lista de productos")
    const todosLosProductos = productos.map ((producto) => producto.nombre + " " + "$" +producto.precio)
    alert (todosLosProductos.join ("\n"))
}else if (solicitarProducto == "no"){
    alert ("¡Gracias por visitar nuestra pagina, hasta pronto!")
}

while (solicitarProducto != "no"){
  let producto = prompt ("¿Que producto desea comprar?")
  let precio = 0
  if ((producto == "protector solar") || (producto == "crema hidratante") || (producto == "agua micelar") || (producto == "contorno de ojos")){
    switch (producto){
      case "protector solar":
        precio = 3500;
        break;
      case "crema hidratante":
        precio = 2200;
        break;
      case "agua micelar":
        precio = 1000;
        break;
      case "contorno de ojos":
        precio = 800;
        break;
      default:
        break;
    }
    let unidades = parseInt (prompt ("¿Cuantas unidades quiere?"))
    
    carrito.push ({producto, unidades, precio})
    console.log (carrito)
  }else{
    alert ("No tenemos ese producto")
  }
  solicitarProducto = prompt ("¿Desea seguir comprando?")
  
  while (solicitarProducto == "no"){
    alert ("¡Gracias por tu compra!")
    carrito.forEach((carritoFinal) => {
      alert("Producto:"+ " " + carritoFinal.producto + " , " + "Unidades:"+ " " + carritoFinal.unidades + " , " + "Total a pagar:"+ " $ " + carritoFinal.unidades * carritoFinal.precio)
    })
  break
  }
}

const total = carrito.reduce ((acc, el) => acc + el.precio * el.unidades, 0)
alert ("El total a pagar es:"+ " $ " + total)