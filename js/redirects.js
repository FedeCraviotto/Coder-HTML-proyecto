const redirectDrumsCategory = document.querySelector(".redirect-drums");
redirectDrumsCategory.addEventListener("click", () => {
  location.href = "./secciones/productos.html?redirected=true&category=drums";
});
const redirectGuitarCategory = document.querySelector(".redirect-guitar");
redirectGuitarCategory.addEventListener("click", () => {
  location.href = "./secciones/productos.html?redirected=true&category=guitar";
});
const redirectMicrophoneCategory = document.querySelector(
  ".redirect-microphone");
redirectMicrophoneCategory.addEventListener("click", () => {
  location.href =
    "./secciones/productos.html?redirected=true&category=microphone";
});
const redirectSaxophoneCategory = document.querySelector(".redirect-saxophone");
redirectSaxophoneCategory.addEventListener("click", () => {
  location.href =
    "./secciones/productos.html?redirected=true&category=saxophone";
});
const redirectAmplifierCategory = document.querySelectorAll(".redirect-amplifier");
redirectAmplifierCategory.forEach(novedad => {
  novedad.addEventListener("click", () => {
    location.href =
      "./secciones/productos.html?redirected=true&category=amplifier";
  });
})
const redirectBassCategory = document.querySelector(".redirect-bass");
redirectBassCategory.addEventListener("click", () => {
  location.href = "./secciones/productos.html?redirected=true&category=bass";
});
const redirectHarmonicaCategory = document.querySelector(".redirect-harmonica");
redirectHarmonicaCategory.addEventListener("click", () => {
  location.href =
    "./secciones/productos.html?redirected=true&category=harmonica";
});
