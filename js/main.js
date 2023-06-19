const botonComprar = document.querySelectorAll('.botonComprar');
botonComprar.forEach(boton => {
  boton.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(event) {
  const producto = event.target.parentNode;
  const nombreProducto = producto.querySelector('h4').textContent;
  const precioProducto = parseFloat(producto.querySelector('h5').textContent.replace('$', ''));

  let productosAgregados = JSON.parse(localStorage.getItem('productosAgregados')) || [];
  productosAgregados.push({ nombre: nombreProducto, precio: precioProducto });
  localStorage.setItem('productosAgregados', JSON.stringify(productosAgregados));

  const miCarrito = document.getElementById('miCarrito');

  const productosDetalle = {};

  productosAgregados.forEach(producto => {
    if (productosDetalle[producto.nombre]) {
      productosDetalle[producto.nombre].cantidad++;
    } else {
      productosDetalle[producto.nombre] = {
        cantidad: 1,
        precio: producto.precio
      };
    }
  });

  let totalProductos = 0;
  let totalPrecio = 0;

  for (const item in productosDetalle) {
    totalProductos += productosDetalle[item].cantidad;
    totalPrecio += productosDetalle[item].cantidad * productosDetalle[item].precio;
  }

  const pCartel = document.getElementById('productosEnCarrito');
  pCartel.innerHTML = `<strong>Total de productos: ${totalProductos}</strong>`;

  miCarrito.innerHTML = '';

  for (const item in productosDetalle) {
    const productoEnCarro = document.createElement('div');
    productoEnCarro.classList.add('contenedor-columnas'); 
  
    const nombreProducto = document.createElement('div');
    nombreProducto.textContent = item;
    nombreProducto.classList.add('columna-producto'); 
    productoEnCarro.appendChild(nombreProducto);
  
    const cantidad = document.createElement('div');
    cantidad.textContent = `x${productosDetalle[item].cantidad}`;
    cantidad.classList.add('columna-cantidad'); 
    productoEnCarro.appendChild(cantidad);
  
    miCarrito.appendChild(productoEnCarro);
  }

  const precioFinal = document.createElement('div');
  precioFinal.innerHTML = `<strong>Precio Final: $${totalPrecio}</strong>`;
  precioFinal.classList.add('precioFinal');
  miCarrito.appendChild(precioFinal); 
}



  
  
  
  