
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

  // Definir a taxa com base na bandeira do cartão
  switch (bandeira) {
    case 'visa':
	taxaParcelamento = 0.0144; // 1,44% por mês para cada parcela antecipada
        if (parcelas === 1) {
        taxaTransacao = 0.0199; // 1,99% para 1x
      } else if (parcelas >= 2 && parcelas <= 6) {
        taxaTransacao = 0.0237; // 2,37% para 2x a 6x
      } else if (parcelas >= 7 && parcelas <= 12) {
        taxaTransacao = 0.0267; // 2,67% para 7x a 12x
      }
      break;
    case 'outros':
	taxaParcelamento = 0.0144; // 1,44% por mês para cada parcela antecipada
      if (parcelas === 1) {
        taxaTransacao = 0.0279; // 2,79% para 1x
      } else if (parcelas >= 2 && parcelas <= 6) {
        taxaTransacao = 0.0317; // 3,17% para 2x a 6x
      } else if (parcelas >= 7 && parcelas <= 12) {
        taxaTransacao = 0.0347; // 3,47% para 7x a 12x
      }
      break;
      default:
      taxaTransacao = 0.05; // Taxa padrão
  }

  // Calcular o valor base após a taxa de transação
  var valorMenosTaxaTransacao = valorBase - (valorBase * taxaTransacao);

  // Calcular o valor de cada parcela sem considerar a antecipação
  var valorParcelaSemAntecipacao = valorMenosTaxaTransacao / parcelas;

  // Calcular o valor antecipado 
  var valorTotalAntecipado = valorParcelaSemAntecipacao * parcelas;
      valorTotalAntecipado = 0;
    for (var i = 1; i <= parcelas; i++) {
      var valorParcelaAntecipada = valorParcelaSemAntecipacao - (valorParcelaSemAntecipacao * (taxaParcelamento * i));
      valorTotalAntecipado += valorParcelaAntecipada;
    }
  // Calcular o valor a ser cobrado do cliente para que, após as taxas, o valor recebido seja igual ao valor base
  var valorCobradoCliente = valorBase / (valorTotalAntecipado / valorBase);

  var valorParcelaComTaxas = valorCobradoCliente / parcelas;

  let jurosadicionados = (valorCobradoCliente / valorBase) -1;

  document.getElementById('resultado').innerHTML = 'Valor final: R$ ' + valorCobradoCliente.toFixed(2) + '<br>' +
                                                   'Valor de cada parcela: R$ ' + valorParcelaComTaxas.toFixed(2) + '<br>' +
	                                           'Juros adicionados: ' + (jurosadicionados * 100).toFixed(2) + '%<br>' +
                                                   'Valor antecipado sem repasse: R$ ' + valorTotalAntecipado.toFixed(2);
}
