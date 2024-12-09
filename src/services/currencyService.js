import axios from 'axios';
import Big from "big.js";

export const fetchCurrencyData = async () => {
  try {
    //const response = await axios.get("https://localhost:7179/api/Currency/getCurrency");
    const response = await axios.get("http://localhost:5000/api/Currency/getCurrency");
    return response.data; // Retorna o array de moedas diretamente
  } catch (error) {
    console.error("Erro ao buscar dados da moeda:", error);
    throw error;
  }
};

export const convertCurrencyGlobal = (amount, fromCurrency, toCurrency, currencyData, toFixed) => {
  if (!amount || isNaN(parseFloat(amount))) return null;

  // Obter as taxas e limpar os valores
  const fromRateString = currencyData.find((item) => item.name === `USD-${fromCurrency}`)?.converted_to_usd;
  const toRateString = currencyData.find((item) => item.name === `USD-${toCurrency}`)?.original_value;
  //alert(fromCurrency)
  const fromRate = new Big(fromRateString || 0);
  const toRate = new Big(toRateString || 0);
  const inputAmount = new Big(amount || 0);

  // Se qualquer uma das taxas for inválida ou zero, retorne null
  if (fromRate.eq(0) || toRate.eq(0)) return null;

  console.log("Amount:", inputAmount.toString(), "| FromRate:", fromRate.toString(), "| ToRate:", toRate.toString());

  // Realiza o cálculo de conversão
  const result = inputAmount.times(fromRate).div(toRate); // Multiplica pela taxa de origem e divide pela taxa de destino
  if(toFixed != null)
    return result.toFixed(toFixed); // Retorna o resultado com 8 casas decimais
  else
    return result

};

export const convertPayOrReceiveGlobal = (amount, fromCurrency, toCurrency, currencyData, toFixed) => {
  if (!amount || isNaN(parseFloat(amount))) return null;

  // Obter as taxas e limpar os valores
  const fromRateString = currencyData.find((item) => item.name === `USD-${fromCurrency}`)?.original_value;
  const toRateString = currencyData.find((item) => item.name === `USD-${toCurrency}`)?.converted_to_usd;

  const fromRate = new Big(fromRateString || 0);
  const toRate = new Big(toRateString || 0);
  const inputAmount = new Big(amount || 0);
  //alert(toRate)
  // Se qualquer uma das taxas for inválida ou zero, retorne null
  if (fromRate.eq(0) || toRate.eq(0)) return null;

  console.log("Amount:", inputAmount.toString(), "| FromRate:", fromRate.toString(), "| ToRate:", toRate.toString());
  //fromRate = inputAmount.times(fromRate).div(toRate)
  // Realiza o cálculo de conversão
  const result = inputAmount.times(fromRate).div(toRate); // Multiplica pela taxa de origem e divide pela taxa de destino
  
  if(toFixed != null)
    return result.toFixed(toFixed); // Retorna o resultado com 8 casas decimais
  else
    return result

};


