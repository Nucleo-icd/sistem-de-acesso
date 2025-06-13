function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Calcula a pontuação total somando os valores enviados
    var total =
      parseInt(data.dor) +
      parseInt(data.diagnostico) +
      parseInt(data.tentativas) +
      parseInt(data.sono) +
      parseInt(data.qualidade) +
      parseInt(data.inatividade) +
      parseInt(data.estresse) +
      parseInt(data.alimentacao) +
      parseInt(data.orientacao) +
      parseInt(data.ergonomia);

    // Classificação com base na pontuação
    var classificacao = "";
    if (total <= 5) {
      classificacao = "Cuidados simples em casa";
    } else if (total <= 11) {
      classificacao = "Atenção leve a moderada";
    } else {
      classificacao = "Necessidade de avaliação profissional";
    }

    // Abre a planilha (insira o ID correto da sua planilha)
    var ss = SpreadsheetApp.openById("PASTE_YOUR_SPREADSHEET_ID_HERE");
    var sheet = ss.getSheetByName("Triagem");
    
    // Grava os dados
    sheet.appendRow([
      data.nome,
      data.sexo,
      data.idade,
      total,
      classificacao,
      new Date()
    ]);

    // Retorna a resposta ao frontend
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      total: total,
      classificacao: classificacao
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
