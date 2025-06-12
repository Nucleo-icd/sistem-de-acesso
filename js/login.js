document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const setor = document.getElementById("setor").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value.trim();

  // Validação para diretoria
  if (setor === "diretoria" && senha === "diretor") {
    window.location.href = "diretoria.html";
    return;
  }

  // Validação para usuários comuns
  if (senha !== "ambulatorio") {
    document.getElementById("errorMsg").innerText = "Senha incorreta.";
    return;
  }

  // Lista de links por setor
  const linkSetores = {
    "alergia": "https://app.powerbi.com/view?r=eyJrIjoiZGMwNmM3NTktMGQ2ZC00ZDFkLWFmOWQtOTBlNzE4ZjQ0MjMyIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "anatomia patologica": "https://app.powerbi.com/view?r=eyJrIjoiMWNjY2FhOTMtNGQ4OS00YzRkLThlNjItZjQ5Yjc5MmU1YzU0IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "anestesiologia": "https://app.powerbi.com/view?r=eyJrIjoiM2MxZDRkMjYtZWEyOS00NTQ1LWIxOGQtZGE4YTIyZDQ0OWEyIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "assistencia domiciliar": "https://app.powerbi.com/view?r=eyJrIjoiOTA1Y2JjMDMtMTBjZS00NWU5LTg5MjMtMTNmZDcxZmI5NWM0IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "assistencia materno fetal": "https://app.powerbi.com/view?r=eyJrIjoiNzA4YTZjZGItZWYyMy00MTE3LTg2ZWUtMTU2OGMxMjY0MTlmIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "bucomaxilo": "https://app.powerbi.com/view?r=eyJrIjoiZTEzZTZkNjUtMjgwNy00YTcxLWE5ODMtNWU0YzIzYTA2N2M5IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cardiologia": "https://app.powerbi.com/view?r=eyJrIjoiZTg2MzBmNWYtYmVjMS00MDkxLWE0NDQtMGQ2ZTA3MDg2MzRmIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "ceame": "https://app.powerbi.com/view?r=eyJrIjoiZDJhOGIyODktMzkxYy00ODEwLTg4NTMtMWQ3NTNmYzczOGQxIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "centro de infusao": "https://app.powerbi.com/view?r=eyJrIjoiMmE4OTVhOWEtNjQ5Zi00NWE5LWIxZWItMTY1YzU0NzNlOTVjIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia cardiaca": "https://app.powerbi.com/view?r=eyJrIjoiZmVkZjJiZDUtMDY3Ny00MzdlLTgxYTUtYmQyN2JlMjAzMTIzIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia de cabeca e pescoco": "https://app.powerbi.com/view?r=eyJrIjoiMzkzOTg3ZDEtZGU2MC00YWZlLWFlODAtMzRjNjk4Nzg5MDRlIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia geral": "https://app.powerbi.com/view?r=eyJrIjoiZDVhZDg2MjMtYTU1Yi00Yzc1LTlhMzktYzlmYTFiODYzMGMzIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia pediatrica": "https://app.powerbi.com/view?r=eyJrIjoiZWRhNDg3ODMtNzQwOS00Y2EzLTgwNWYtNDQ2NjM0ZTIwYTBmIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia plastica": "https://app.powerbi.com/view?r=eyJrIjoiNzFiMmJiNTgtODg0ZC00MTIyLWFiZGMtM2JmYWE1OWYzNTA3IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia toracica": "https://app.powerbi.com/view?r=eyJrIjoiMjAzYjY0YzItMjBkMS00MzY3LTkxZDItNzVlOTFkMzQ0ZGNjIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cirurgia vascular": "https://app.powerbi.com/view?r=eyJrIjoiMTE2NjAwOGQtNWZjOS00MmVhLWJkMTYtNGM0ZTRmZTNlNGFmIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS08M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "clinica medica": "https://app.powerbi.com/view?r=eyJrIjoiNTA1NjRlYmItYjgxMS00NzZhLTk4OWUtMTJhYmJmNTU1MTJiIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    "cuidados paliativos": "",
    "dermatologia": "",
    "endocrinologia": "",
    "endoscopia": "",
    "enfermagem": "",
    "estomaterapia": "",
    "fisiatria": "",
    "fisioterapia": "",
    "fonoaudiologia": "",
    "gastrocirurgia": "",
    "gastroclinica": "",
    "geriatria": "",
    "ginecologia": "https://setorginecologia.com",
    "hematologia": "",
    "hemodialise": "",
    "hemoterapia": "",
    "infectologia": "",
    "medicina exercicio e do esporte": "",
    "medicina nuclear": "",
    "nefrologia": "",
    "neurocirurgia": "",
    "neurologia clinica": "",
    "nutricao": "",
    "nutrologia": "",
    "oftalmologia": "",
    "oncologia": "",
    "ortopedia": "",
    "otorrinolaringologia": "",
    "pediatria": "",
    "pneumologia": "",
    "psicologia": "",
    "psiquiatria": "",
    "radioterapia": "",
    "reumatologia": "",
    "serviço social": "",
    "terapia ocupacional": "",
    "urologia": ""
  };

  const destino = linkSetores[setor];
  if (!destino) {
    document.getElementById("errorMsg").innerText = "Setor não encontrado.";
    return;
  }

  // Envia dados para o Google Sheets
  fetch("https://script.google.com/macros/s/AKfycby6wBubEvs5uY9_RyrwXY-DrowG9t-xP9ChEioCebkdOzZHwXmVUUqtM5zOWY_1v8jz/exec", {
    method: "POST",
    body: new URLSearchParams({ setor })
  });

  // Redireciona para o link do setor
  window.location.href = destino;
});
