let listadoDeProductos;
async function pedirListado () {
    try {
        const productosFetch = await fetch('../database/products.json');
        const data = await productosFetch.json();
        listadoDeProductos = data;
        crearProductos(listadoDeProductos)
        } catch (error) {
            console.log('Oh ha habido un error');
        }
}
function crearProductos(listado) {
    let productRow = document.createElement('div');
    productRow.setAttribute('class', 'row productos-container mt-5 pt-5');
    listado.forEach(producto => {
        let product = document.createElement('article');
        product.setAttribute('class', 'col-sm-3 col-lg-2 col-12');
        product.innerHTML = `
          <div class="card my-3">
            <img src="../img/products/${producto.image}" class="card-img-top" alt="${producto.shortDesc}">
            <div class="card-body">
                <p class="card-text card-text--price">$${parseInt(producto.price)}</p>
                <p class="card-text">${producto.name}</p>
            </div>
          </div>
        `
        productRow.append(product);
    })
    document.querySelector('.productos__listado-completo').append(productRow);
}
pedirListado()

const productQuery = document.querySelector('#search-input');
const btnSearch = document.querySelector('.fa-magnifying-glass');
btnSearch.addEventListener('click', () => {
    let productos = listadoDeProductos 
    let query = productQuery.value.toLowerCase();
    let searchResult = productos.filter((producto) => { 
        return producto.name.toLowerCase().includes(query);
    })
    document.querySelector('.productos__listado-completo').innerHTML = ``
    crearProductos(searchResult)
})