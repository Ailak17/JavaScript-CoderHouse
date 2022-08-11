Swal.fire({
    title: 'Bienvenidos a Sofi Bordando!', 
    text: 'Pasate por nuestras redes sociales para ganar descuentos!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })


class Producto {
    constructor(id, nombre, imagen, detalle, precio) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.detalle = detalle; 
        this.precio = precio;
    }
}
let stock = [];

async function bordadosJson(){
    return(await fetch("/data.json")).json();
    }
document.addEventListener("DOMContentLoaded", async ()=> {
    try {
        bordados = await bordadosJson();
        for (let i = 0; i < 1; i++) {
            bordados.id = (i + 1);
            bordados.name = [i];
            stock=bordados;
            mostrarStock()
        }
    } catch(e){
        console.log("Error!")
    }

})
console.log(stock);

function mostrarStock() {
    for (let i = 0; i < stock.length; i++) {
        let tarjeta = document.createElement('div');
        tarjeta.setAttribute("class", "card col-3 ");
        tarjeta.innerHTML = `
              <div class="card-body d-flex flex-column width: 9 rem">
                  <img ${stock[i].imagen} class="imgCard">
                  <h4 class="card-title titleCard">${stock[i].nombre}</h4>
                  <p class="card-text">${stock[i].detalle}</p>
                  <p class="card-text">Precio $${stock[i].precio}</p>
                  <button 
                      class="btn btn-primary botonDiv" 
                      data-id=${stock[i].id}
                      data-nombre=${stock[i].nombre.replaceAll(" ", "_")} 
                      data-precio=${stock[i].precio} 
                      onclick="agregarProducto(event)"
                  >Comprar</button>
              </div>
              `;
        document.querySelector('#stock').appendChild(tarjeta);
    }
}

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarTotal();
    mostrarCarrito();
}

function mostrarCarrito() {
    let acumuladorCarritoHTML = ``;

    for (let i = 0; i < carrito.length; i++) {
        let template = `
        <div class="card" style="width:200px">
            <div class="card-body">
                <h4 class="card-title textCarrito">${carrito[i].nombre.replaceAll("_", " ")}</h4>
                <p class="card-text">Cantidad: ${carrito[i].cantidad}</p>
                <p class="card-text">Precio $${carrito[i].precio * carrito[i].cantidad}</p>
                <button 
                class="btn btn-danger botonDiv"  
                onclick="eliminarProducto('${carrito[i].id}')"
                >Eliminar</button>
            </div>
        </div>
        `;

        acumuladorCarritoHTML += template;
    }

    document.querySelector('#carrito').innerHTML = acumuladorCarritoHTML;
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function agregarProducto(event) {
    let encontrado = carrito.findIndex(item => item.id == event.target.dataset.id);
    if (encontrado == -1) {
        let productoElegido = new Producto(event.target.dataset.id,
            event.target.dataset.nombre,
            event.target.dataset.imagen,
            event.target.dataset.detalle,
            event.target.dataset.precio);
        productoElegido.cantidad = 1;
        carrito.push(productoElegido);
    } else {
        carrito[encontrado].cantidad += 1;
    }
    mostrarCarrito();
    actualizarTotal();
}


function eliminarProducto(id) {
    let encontrado = carrito.findIndex(item => item.id == id);
    carrito.splice(encontrado, 1);
    mostrarCarrito();
    actualizarTotal();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarTotal();
}

function actualizarTotal() {
    let total = 0;
    carrito.forEach(item => total += (item.cantidad * item.precio));
    document.querySelector('#total').innerHTML = "$" + total;
}
mostrarStock();
