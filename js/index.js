const redirectDrumsCategory = document.querySelector('.redirect-drums');
redirectDrumsCategory.addEventListener('click', () => {
  location.href = "./secciones/productos.html?redirected=true&category=drums";
})
const redirectGuitarCategory = document.querySelector('.redirect-guitar');
redirectGuitarCategory.addEventListener('click', () => {
    location.href = "./secciones/productos.html?redirected=true&category=guitar";
  })
const redirectMicrophoneCategory = document.querySelector('.redirect-microphone');
redirectMicrophoneCategory.addEventListener('click', () => {
    location.href = "./secciones/productos.html?redirected=true&category=microphone";
  })
const redirectSaxophoneCategory = document.querySelector('.redirect-saxophone');
redirectSaxophoneCategory.addEventListener('click', () => {
    location.href = "./secciones/productos.html?redirected=true&category=saxophone";
  })