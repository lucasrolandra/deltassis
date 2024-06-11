function calcularValorFinal() {
  var valorBase = parseFloat(document.getElementById('valorBase').value);
  var parcelas = parseInt(document.getElementById('parcelas').value);
  var bandeira = document.getElementById('bandeira').value;
  var taxaTransacao = 0;
  var taxaParcelamento = 0;
  var tarifaUnica = 0;

  // Verificar se os valores de entrada são válidos
  if (isNaN(valorBase) || valorBase <= 0 || isNaN(parcelas) || parcelas <= 0) {
    alert('Por favor, insira valores válidos.');
    return;
  }

  // Definir as taxas de transação para Visa com base no número de parcelas
  var taxasVisa = [0, 0.0316, 0.0457, 0.0538, 0.0618, 0.0697, 0.0775, 0.0892, 0.0969, 0.1044, 0.1119, 0.1193, 0.1266];

  // Definir a taxa com base na bandeira do cartão
  switch (bandeira) {
    case 'visa':
      taxaTransacao = taxasVisa[parcelas];
      break;
    case 'elo':
      taxaTransacao = 0,0399; // 3,99% de taxa para Elo
      break;
    case 'banri':
      taxaTransacao = (parcelas <= 6) ? 0.03 : 0.038; // 3% até 6 parcelas, 3.8% acima de 6 parcelas
      taxaParcelamento = 0.024 * parcelas; // 2.4% por mês para cada parcela antecipada
      tarifaUnica = 2.00; // Taxa única de R$ 2,00
      break;
    default:
      taxaTransacao = 0.05; // Taxa padrão
  }
// Calcula a taxa em reais
  var taxareais = valorBase * taxaTransacao;
  // Calcula o valor base - a taxa em reais
  var valormenostaxa = valorBase - taxareais;
  // Calcula o divisor
  var divisor = valormenostaxa / valorBase;
    // Calcula e mostra o valor a ser pago pelo cliente
  var valorFinal = valorBase / divisor;
   // Calcula e mostra o valor a de cada parcela
  var valorParcela = valorFinal / parcelas;


  // Mostrar os resultados
  document.getElementById('resultado').innerHTML = 'Valor Final: R$ ' + valorFinal.toFixed(2) + '<br>' +
                                                   'Valor de Cada Parcela: R$ ' + valorParcela.toFixed(2);
}
