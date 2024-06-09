function calcularValorFinal() {
  var valorBase = parseFloat(document.getElementById('valorBase').value);
  var parcelas = parseInt(document.getElementById('parcelas').value);
  var bandeira = document.getElementById('bandeira').value;
  var taxaTransacao = 0;
  var taxaParcelamento = 0;
  var tarifaUnica = 0;

  // Definir a taxa com base na bandeira do cartão
  switch (bandeira) {
    case 'visa':
      taxaTransacao = 0.05; // 5% de taxa para Visa
      break;
    case 'mastercard':
      taxaTransacao = 0.06; // 6% de taxa para MasterCard
      break;
    case 'elo':
      taxaTransacao = 0.07; // 7% de taxa para Elo
      break;
    case 'banri':
      taxaTransacao = (parcelas <= 6) ? 0.03 : 0.038; // 3% até 6 parcelas, 3.8% acima de 6 parcelas
      taxaParcelamento = 0.024 * parcelas; // 2.4% por mês para cada parcela antecipada
      tarifaUnica = 2.00; // Taxa única de R$ 2,00
      break;
    default:
      taxaTransacao = 0.05; // Taxa padrão
  }

  // Calcular o valor final com acréscimo
  var valorFinal = valorBase * (1 + taxaTransacao + taxaParcelamento) + tarifaUnica;
  var valorParcela = valorFinal / parcelas;

  // Mostrar os resultados
  document.getElementById('resultado').innerHTML = 'Valor Final: R$ ' + valorFinal.toFixed(2) + '<br>' +
                                                   'Valor de Cada Parcela: R$ ' + valorParcela.toFixed(2);
}
