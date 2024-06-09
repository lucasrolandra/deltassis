function calcularValorFinal() {
  var valorBase = parseFloat(document.getElementById('valorBase').value);
  var parcelas = parseInt(document.getElementById('parcelas').value);
  var bandeira = document.getElementById('bandeira').value;
  var taxaTransacao = 0;
  var taxaParcelamento = 0;
  var tarifaUnica = 0;

  // Definir as taxas de transação para Visa com base no número de parcelas
  var taxasVisa = [0, 0.0316, 0.0457, 0.0538, 0.0618, 0.0697, 0.0775, 0.0892, 0.0969, 0.1044, 0.1119, 0.1193, 0.1266];

  // Definir a taxa com base na bandeira do cartão
  switch (bandeira) {
    case 'visa':
      if (parcelas >= 1 && parcelas <= 12) {
        taxaTransacao = taxasVisa[parcelas];
      } else {
        alert('Número de parcelas inválido para Visa. Deve ser entre 1 e 12.');
        return;
      }
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

  // Evitar divisão por zero
  if (valorBase * (1 - taxaTransacao) === 0) {
    alert('Erro: A fórmula resulta em uma divisão por zero.');
    return;
  }

  // Calcular o valor final com a nova fórmula
  var valorFinal = valorBase / (valorBase - (valorBase * taxaTransacao)) / valorBase;
  var valorParcela = valorFinal / parcelas;

  // Mostrar os resultados
  document.getElementById('resultado').innerHTML = 'Valor Final: R$ ' + valorFinal.toFixed(2) + '<br>' +
                                                   'Valor de Cada Parcela: R$ ' + valorParcela.toFixed(2);
}
