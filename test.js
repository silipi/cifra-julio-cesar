const texto = "icdtkgn uknkrk nkpfq octcxknjquq";
const alfabeto = "abcdefghijklmnopqrstuvwxyz";
const casas = 2;
let resultado = "";

[...texto].forEach(letra => {
  if (alfabeto.includes(letra)) {
    let posicao = alfabeto.search(letra);
    posicao = (posicao - casas) % 26;
    resultado = resultado + alfabeto[posicao];
  } else {
    const espaço = " ";
    resultado = resultado + espaço;
  }
});
console.log(resultado);
