const stockProductos = localStorage.getItem("products");
const products = stockProductos ? JSON.parse(stockProductos) : [
    { id: 1, nombre: "Camiseta Boca Juniors Titular 23/24", precio: 35000, imagen: "img/1-boca-titu.jpg" },
    { id: 2, nombre: "Camiseta Boca Juniors Suplente 23/24", precio: 32000, imagen: "img/2-boca-suple.jpg" },
    { id: 3, nombre: "Camiseta Argentina Femenino 23/24", precio: 33000, imagen: "img/3-argentina.jpg" },
    { id: 4, nombre: "Camiseta Boca Juniors Entrenamiento 23/24", precio: 31000, imagen: "img/4-boca-entre.jpg" },
    { id: 5, nombre: "Camiseta River Plate Titular 23/24", precio: 35000, imagen: "img/5-river-suple.jpg" },
    { id: 6, nombre: "Camiseta River Plate Entrenamiento 23/24", precio: 31000, imagen: "img/6-river-entre.jpg" },
    { id: 7, nombre: "Camiseta River Plate Suplente 23/24", precio: 32000, imagen: "img/7-river-titu.jpg" },
    { id: 8, nombre: "Camiseta San Lorenzo Titular 23/24", precio: 29000, imagen: "img/8-sl-titu.jpg" },
    { id: 9, nombre: "Camiseta Racing Club Titular 23/24", precio: 27000, imagen: "img/9-racing-titu.jpg" },
    { id: 10, nombre: "Camiseta Independiente Titular 23/24", precio: 25000, imagen: "img/inpendientefrente.jpg" },
    { id: 11, nombre: "Camiseta San Lorenzo Suplente 23/24", precio: 26000, imagen: "img/156100-1600-auto.jpg" },
    { id: 12, nombre: "Camiseta Independiente Suplente 23/24", precio: 22000, imagen: "img/independientesuple.jpg" },
];

const listaProducts = document.getElementById("product-list"); // Obtener el elemento de la lista de productos

// Función para mostrar los elementos
function mostrarProductos(productosAMostrar) {
    listaProducts.innerHTML = "";
    productosAMostrar.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product";
        productItem.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}">
        <h3>${product.nombre}</h3>
        <p>Precio: $${product.precio}</p>
        <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
    `;
        listaProducts.appendChild(productItem);
    });
}

mostrarProductos(products);

// Obtener el elemento del carrito y mostrar el total
const cartElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

const carritoAlmacenado = localStorage.getItem("cart"); // Obtener los datos del carrito almacenado

const cartItems = carritoAlmacenado ? JSON.parse(carritoAlmacenado) : []; // Array de productos en el carrito, usando los datos del almacenamiento

listaProducts.addEventListener("click", event => {
    if (event.target.classList.contains("add-to-cart")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            cartItems.push(productToAdd);
            actualizarCarrito();
        }
    }
});

// Evento para los clics en el carrito
cartElement.addEventListener("click", event => {
    if (event.target.classList.contains("remove-from-cart")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const productIndex = cartItems.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            cartItems.splice(productIndex, 1);
            actualizarCarrito();
        }
    }
});

// Actualizar la presentación del carrito y calcular el total
function actualizarCarrito() {
    cartElement.innerHTML = "";
    let total = 0;
    cartItems.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <span>${item.nombre}</span> - $${item.precio}
            <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
        `;
        cartElement.appendChild(cartItem);
        total += item.precio;
    });

    const cartBadge = document.getElementById("cart-cant");
    cartBadge.textContent = cartItems.length;
    cartTotalElement.textContent = "$" + total;
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Evento de escucha antes de que la ventana se cierre
window.addEventListener("beforeunload", () => {
    // Almacenar los productos en el almacenamiento local como JSON antes de cerrar
    localStorage.setItem("products", JSON.stringify(products));
});

// Evento de escucha al filtro de nombres
nameFilter.addEventListener("change", actualizarProducts);

// Función para actualizar la lista de productos según el filtro 
function actualizarProducts() {
    const selectedName = nameFilter.value;
    const filteredProducts = products.filter(product => {
        const nameMatch = selectedName === "all" || product.nombre.includes(selectedName);
        return nameMatch;
    });

    mostrarProductos(filteredProducts);  // Mostrar los productos filtrados en la página
}