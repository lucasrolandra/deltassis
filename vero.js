
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
     if (parcelas === 1) {
        taxaTransacao = 0.032; // 3,2% para 1x
      } else if (parcelas >= 2 && parcelas <= 6) {
        taxaTransacao = 0.04; // 4% para 2x a 6x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      } else if (parcelas >= 7 && parcelas <= 12) {
        taxaTransacao = 0.046; // 4,6% para 7x a 12x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      }
      break;
    case 'elo':
     if (parcelas === 1) {
        taxaTransacao = 0.032; // 3,2% para 1x
      } else if (parcelas >= 2 && parcelas <= 6) {
        taxaTransacao = 0.04; // 4% para 2x a 6x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      } else if (parcelas >= 7 && parcelas <= 12) {
        taxaTransacao = 0.046; // 4,6% para 7x a 12x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      }
      break;
    case 'banri':
      if (parcelas === 1) {
        taxaTransacao = 0.0250; // 2,5% para 1x
      } else if (parcelas >= 2 && parcelas <= 6) {
        taxaTransacao = 0.03; // 3% para 2x a 6x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      } else if (parcelas >= 7 && parcelas <= 12) {
        taxaTransacao = 0.038; // 3,8% para 7x a 12x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      }
    case 'diners':
      if (parcelas === 1) {
        taxaTransacao = 0.0319; // 3,19% para 1x
      } else {
        taxaTransacao = 0.0379; // 3,79% para 2x a 12x
        taxaParcelamento = 0.0169; // 1,69% por mês para cada parcela antecipada
      } 
      break;
    case 'mastercard':
      if (parcelas === 1) {
        taxaTransacao = 0.032; // 3,2% para 1x
      } else if (parcelas >= 2 && parcelas <= 6) {
        taxaTransacao = 0.04; // 4% para 2x a 6x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      } else if (parcelas >= 7 && parcelas <= 12) {
        taxaTransacao = 0.046; // 4,6% para 7x a 12x
        taxaParcelamento = 0.024; // 2,4% por mês para cada parcela antecipada
      }
	  break;
    default:
      taxaTransacao = 0.05; // Taxa padrão
  }

  // Calcular o valor base após a taxa de transação
  var valorMenosTaxaTransacao = valorBase - (valorBase * taxaTransacao);

  // Calcular o valor de cada parcela sem considerar a antecipação
  var valorParcelaSemAntecipacao = valorMenosTaxaTransacao / parcelas;

  // Calcular o valor antecipado para bandeiras com taxa de antecipação
  var valorTotalAntecipado = valorParcelaSemAntecipacao * parcelas;
  if (bandeira === 'banri' || (bandeira === 'visa' && parcelas > 1) || (bandeira === 'diners' && parcelas > 1) || (bandeira === 'elo' && parcelas > 1) || (bandeira === 'mastercard' && parcelas > 1)) {
    valorTotalAntecipado = 0;
    for (var i = 1; i <= parcelas; i++) {
      var valorParcelaAntecipada = valorParcelaSemAntecipacao - (valorParcelaSemAntecipacao * (taxaParcelamento * i));
      valorTotalAntecipado += valorParcelaAntecipada;
    }
    valorTotalAntecipado -= tarifaUnica; // Subtrair a tarifa única, se for o caso
  }

   // Calcular o valor a ser cobrado do cliente para que, após as taxas, o valor recebido seja igual ao valor base
  var valorCobradoCliente = tarifaUnica + (valorBase / (valorTotalAntecipado / valorBase));

  var valorParcelaComTaxas = valorCobradoCliente / parcelas;

  document.getElementById('resultado').innerHTML = 'Valor final: R$ ' + valorCobradoCliente.toFixed(2) + '<br>' +
                                                   'Valor de cada parcela: R$ ' + valorParcelaComTaxas.toFixed(2) + '<br>' +
                                                   'Valor antecipado sem repasse: R$ ' + valorTotalAntecipado.toFixed(2);
}
