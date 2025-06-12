// js/registrar.js

function registrarAcesso(setor) {
  const url = "https://script.google.com/macros/s/AKfycby6wBubEvs5uY9_RyrwXY-DrowG9t-xP9ChEioCebkdOzZHwXmVUUqtM5zOWY_1v8jz/exec"; // ← Cole aqui sua URL

  const formData = new FormData();
  formData.append("setor", setor);

  fetch(url, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    console.log("Registro OK:", result);
  })
  .catch(error => {
    console.error("Erro ao registrar acesso:", error);
  });
}
