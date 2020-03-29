// Bibliotecas usadas *REQUER NODE.JS*:
const fetch = require("node-fetch");
const fs = require("fs");
const sha1 = require("js-sha1");
let FormData = require("form-data");
const request = require("request");

// Recursos do desafio:
const myToken = "3fe96b1d26270fc689636d07113afdef5f6a7577";
const urlReq = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${myToken}`;
const urlPost = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${myToken}`;

const alfabeto = "abcdefghijklmnopqrstuvwxyz";

// Parte 1 - Fetch para a API, todo o código vive dentro deste fetch.
fetch(urlReq)
  .then(function(response) {
    response.json().then(function(data) {
      const cifrado = data.cifrado; //Pegando direto do arquivo JSON retornado na req.
      const numCasas = data.numero_casas; //Pegando direto do arquivo JSON retornado na req.
      let decifrado = "";
      let resumo_criptografico = "";

      // Parte 2 - Código que irá decifrar a Cifra de Julio César
      [...cifrado].forEach(letra => {
        if (alfabeto.includes(letra)) {
          let posicao = alfabeto.search(letra);
          posicao = (posicao - numCasas) % 26; // Usado para voltar ao começo do alfabeto, ex.: Z + 5 => 26 + 5 % 26 => volta ao 5
          decifrado = decifrado + alfabeto[posicao];
        } else {
          decifrado += letra;
        }
      });

      data.decifrado = decifrado;

      // Parte 3 - Passando um hash sha1 para o código criptografado
      resumo_criptografico = sha1(decifrado);
      data.resumo_criptografico = resumo_criptografico;

      // Parte 4 - Cria o arquivo "answer.json" já com todas as informações.
      fs.writeFileSync("./answer.json", JSON.stringify(data));
    });
  })
  .catch(function(err) {
    // Catch de erro básico hehe
    console.error("Falhou em fazer o 'fetch', erro:", err);
  });

let arq = { answer: fs.createReadStream("./answer.json") };

request.post({ url: urlPost, formData: arq }, function optionalCallback(
  err,
  httpResponse,
  body
) {
  if (err) {
    return console.error("upload failed:", err);
  }
  console.log("Upload successful!  Server responded with:", body);
});
