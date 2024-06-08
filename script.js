function calcularValorBaseNecessario(parcelas, bandeira) {
  let taxaTransacao = 0;
  let taxaParcelamento = 0;
  let tarifaUnica = 0;

  // Obter o valor base desejado do input do usuário
  let valorBaseDesejado = parseFloat(document.getElementById('valorBase').value);
  if (isNaN(valorBaseDesejado)) {
    alert('Por favor, insira um valor numérico válido para o valor base.');
    return;
  }

  // Definir as taxas com base na bandeira do cartão
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
      taxaTransacao = (parcelas <= 6) ? 0.03 : 0.038; // 3% até 6 parcelas, 3.8% acima
      taxaParcelamento = 0.024 * parcelas; // 2.4% por mês para cada parcela
      tarifaUnica = 2.00; // Taxa única de R$ 2,00
      break;
    default:
      taxaTransacao = 0.05; // Taxa padrão
  }

  // Calcular o valor base necessário
  var valorBaseNecessario = (valorBaseDesejado + tarifaUnica) / (1 - taxaTransacao - taxaParcelamento);

  // Mostrar os resultados
  document.getElementById('resultado').innerHTML = 'Valor Base Necessário: R$ ' + valorBaseNecessario.toFixed(2);
}

// Uso da função
var bandeira = 'banri'; // Bandeira do cartão selecionada pelo usuário
var parcelas = 1; // Número de parcelas selecionado pelo usuário
calcularValorBaseNecessario(parcelas, bandeira);
