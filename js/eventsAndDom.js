let listadoDeProductos;
let listadoUnsorted;
async function pedirListado() {
  try {
    const productosFetch = await fetch("../database/products.json");
    const data = await productosFetch.json();
    listadoDeProductos = data;
    listadoUnsorted = data;
    crearProductos(listadoDeProductos);
  } catch (error) {
    console.log("Oh ha habido un error");
  }
}

function crearProductos(listado) {
  let productRow = document.createElement("div");
  productRow.setAttribute("class", "row productos-container mt-5 pt-5");
  listado.forEach((producto) => {
    let product = document.createElement("article");
    product.setAttribute("class", "col-sm-3 col-lg-2 col-12");
    product.innerHTML = `
          <div class="card my-3 special-card__inner">
            <img src="../img/products/${
              producto.image
            }" class="card-img-top" alt="${producto.shortDesc}">
            <div class="card-body special-card__innerBody">
                <p class="card-text">${producto.name}</p>
            </div>
          

          <div class="special-card__face special-card__face--back">
            <div class="special-card__content">
        
              <div class="special-card__header">
              ${producto.shortDesc}
              </div>
              <div class="special-card__contentBody">
              <p>Color: ${producto.color}</p>
              <p>Marca: ${producto.brand}</p>
              <p class="special-card__text--highlighted">Envío: <strong>Gratis</strong></p>
              <p class="special-card__text--highlighted">Descuento: <strong>${parseInt(
                producto.discount * 100
              )}%</strong></p>
              <p class="special-card__text--highlighted">Total: <strong>${toThousand(
                parseInt((1 - producto.discount) * producto.price)
              )}</strong></p>
              </div>
        
            </div>
            
          </div>
          </div>
        `;
    productRow.append(product);
  });
  document.querySelector(".productos__listado-completo").append(productRow);
  applyCardEvents();
}
pedirListado();

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let categoryFilter = [];

let filterCheckboxes = document.querySelectorAll(".filter-checkbox");
filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      if (!categoryFilter.find((cat) => cat == checkbox.value))
        categoryFilter.push(checkbox.value);
    }
    if (!checkbox.checked) {
      if (categoryFilter.find((cat) => cat == checkbox.value)) {
        let newFilters = categoryFilter.filter((cat) => cat !== checkbox.value);
        categoryFilter = newFilters;
      }
    }
  });
});

let searchResult;
const productQuery = document.querySelector("#search-input");
const btnSearch = document.querySelector(".fa-magnifying-glass");
btnSearch.addEventListener("click", () => {
  let productos = listadoDeProductos;
  let query = productQuery.value.toLowerCase();
  searchResult = productos.filter((producto) => {
    return producto.name.toLowerCase().includes(query);
  });
  let searchResultFiltered = [];
  if (categoryFilter.length > 0) {
    categoryFilter.forEach((categ) => {
      let filter = searchResult.filter((resultado) => {
        return resultado.category.includes(categ);
      });
      filter.forEach((res) => searchResultFiltered.push(res));
    });
    searchResult = searchResultFiltered;
  }
  document.querySelector(".productos__listado-completo").innerHTML = ``;
  crearProductos(searchResult);
});

productQuery.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let productos = listadoDeProductos;
    let query = productQuery.value.toLowerCase();
    searchResult = productos.filter((producto) => {
      return producto.name.toLowerCase().includes(query);
    });
    let searchResultFiltered = [];
    if (categoryFilter.length > 0) {
      categoryFilter.forEach((categ) => {
        let filter = searchResult.filter((resultado) => {
          return resultado.category.includes(categ);
        });
        filter.forEach((res) => searchResultFiltered.push(res));
      });
      searchResult = searchResultFiltered;
    }
    document.querySelector(".productos__listado-completo").innerHTML = ``;
    crearProductos(searchResult);
  }
});

const orderSelect = document.querySelector(".filter-alphabeticall-order");
orderSelect.addEventListener("change", () => {
  if (searchResult !== undefined) {
    if (orderSelect.value == "alphabetically") {
      searchResult.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (orderSelect.value == "reverse") {
      searchResult.sort((a, b) => b.name.localeCompare(a.name));
    }
    document.querySelector(".productos__listado-completo").innerHTML = ``;
    crearProductos(searchResult);
  } else if (searchResult === undefined) {
    if (orderSelect.value == "alphabetically") {
      listadoDeProductos.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (orderSelect.value == "reverse") {
      listadoDeProductos.sort((a, b) => b.name.localeCompare(a.name));
    }
    document.querySelector(".productos__listado-completo").innerHTML = ``;
    crearProductos(listadoDeProductos);
  }
});

const inputRangoMaximo = document.querySelector("#rangoMaximo");
const inputRangoMinimo = document.querySelector("#rangoMinimo");
let maxCostSpan = document.querySelector("#maxCost");
let minCostSpan = document.querySelector("#minCost");

[inputRangoMaximo, inputRangoMinimo].forEach((rangoInput) =>
  rangoInput.addEventListener("change", () => {
    minCostSpan.textContent = `$${inputRangoMinimo.value}`;
    maxCostSpan.textContent = `$${inputRangoMaximo.value}`;
    searchResult;
    if (searchResult !== undefined) {
      let resultsFilteredByPrice = searchResult.filter((resultado) => {
        return (
          resultado.price >= inputRangoMinimo.value &&
          resultado.price <= inputRangoMaximo.value
        );
      });
      console.log(resultsFilteredByPrice);
      document.querySelector(".productos__listado-completo").innerHTML = ``;
      crearProductos(resultsFilteredByPrice);
    } else if (searchResult === undefined) {
      let productsFilteredByPrice = listadoDeProductos.filter((resultado) => {
        return (
          resultado.price >= inputRangoMinimo.value &&
          resultado.price <= inputRangoMaximo.value
        );
      });
      console.log(productsFilteredByPrice);
      document.querySelector(".productos__listado-completo").innerHTML = ``;
      crearProductos(productsFilteredByPrice);
    }
  })
);

if (new URL(location.href).searchParams.get("redirected") == "true") {
  if (new URL(location.href).searchParams.get("category") == "drums") {
    document.querySelector("#drums").checked = true;
    categoryFilter.push("drums");
  } else if (new URL(location.href).searchParams.get("category") == "guitar") {
    document.querySelector("#guitar").checked = true;
    categoryFilter.push("guitar");
  } else if (
    new URL(location.href).searchParams.get("category") == "microphone"
  ) {
    document.querySelector("#microphone").checked = true;
    categoryFilter.push("microphone");
  } else if (
    new URL(location.href).searchParams.get("category") == "saxophone"
  ) {
    document.querySelector("#saxophone").checked = true;
    categoryFilter.push("saxophone");
  } else if (
    new URL(location.href).searchParams.get("category") == "amplifier"
  ) {
    document.querySelector("#amplifier").checked = true;
    categoryFilter.push("amplifier");
  } else if (
    new URL(location.href).searchParams.get("category") == "bass"
  ) {
    document.querySelector("#bass").checked = true;
    categoryFilter.push("bass");
  } else if (
    new URL(location.href).searchParams.get("category") == "harmonica"
  ) {
    document.querySelector("#harmonica").checked = true;
    categoryFilter.push("harmonica");
  }
  
  setTimeout(() => {
    let searchResultFiltered = [];
    categoryFilter.forEach((categ) => {
      let filter = listadoDeProductos.filter((resultado) => {
        return resultado.category.includes(categ);
      });
      filter.forEach((res) => searchResultFiltered.push(res));
    });
    searchResult = searchResultFiltered;
    document.querySelector(".productos__listado-completo").innerHTML = ``;
    crearProductos(searchResult);
  }, 200);
}

///En construcción
function applyCardEvents() {
  let allCards = document.querySelectorAll(".special-card__inner");
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("is-flipped")) {
        card.classList.toggle("is-flipped");
        console.log(card.querySelector(".special-card__face--back"));
        card.querySelector(".special-card__innerBody").style.display = "none";
        card.querySelector(".special-card__face--back").style.display = "block";
      } else if (card.classList.contains("is-flipped")) {
        card.classList.toggle("is-flipped");
        card.querySelector(".special-card__innerBody").style.display = "block";
        card.querySelector(".special-card__face--back").style.display = "none";
      }
    });
  });
}
