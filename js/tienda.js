function seleccionarProducto(nombre, precio, imagen) {
    const producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen
    };
    localStorage.setItem('productoParaPagar', JSON.stringify(producto));
    window.location.href = './checkout.html';
}

function mostrarResumen() {
    const datosRecuperados = localStorage.getItem('productoParaPagar');
    if (datosRecuperados) {
        const producto = JSON.parse(datosRecuperados);
        document.getElementById('resumen-foto').src = producto.imagen;
        document.getElementById('resumen-nombre').innerText = producto.nombre;
        document.getElementById('resumen-precio').innerText = producto.precio.toLocaleString() + "$";

        const domicilio = 2000;
        const total = parseInt(producto.precio) + domicilio;
        document.getElementById('resumen-total').innerText = total.toLocaleString() + "$";
    }
}