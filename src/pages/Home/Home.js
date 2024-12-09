import React, { useState, useEffect, useCallback } from 'react';
import CurrencyPopup from '../../components/CurrencyPopup/CurrencyPopup';
import { fetchCurrencyData, convertCurrencyGlobal,convertPayOrReceiveGlobal } from '../../services/currencyService';

const Home = () => {

  const [configCurrency] = useState({
    BTC: { toFixed: 6 },
  });
  const [currency, setCurrency] = useState({ codeKey: "BTC", value: "" }); // Valor inicial
  const [currencyPayOrReceive, setCurrencyPayOrReceive] = useState({ codeKey: "BRL", value: "1000" }); // Valor inicial
  const [isBuying, setIsBuying] = useState(true); // Alternar entre comprar e vender
  const [currencyData, setCurrencyData] = useState([]); // Dados de moeda

  // Define UpdateInitCurrencies with useCallback to memoize it
  const UpdateInitCurrencies = useCallback((data) => {
    if (currencyPayOrReceive.value) {      
      setCurrency((prev) => ({
        ...prev,
        value: convertCurrencyGlobal(
          currencyPayOrReceive.value,
          currencyPayOrReceive.codeKey,
          currency.codeKey,
          data,
          (configCurrency[currency.codeKey]?.toFixed || 2)
        )
      }));
    }
  }, [currencyPayOrReceive.value, currencyPayOrReceive.codeKey, currency.codeKey, configCurrency]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const data = await fetchCurrencyData(); // Fetch data from API
        setCurrencyData(data); // Save fetched currency data to state
        UpdateInitCurrencies(data); // Update initial currencies
      } catch (error) {
        console.error("Erro ao buscar dados de câmbio:", error);
      }
    };
  
    fetchExchangeRate(); // Call the function on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures it runs only once
  

  const handlePopupClose = (type, code) => {
    // Atualiza currency
    if(type === "buyOrSellCurrencies")
    if (currencyPayOrReceive.value) {
      setCurrency((prev) => ({
        ...prev,
        value: convertCurrencyGlobal(
          currencyPayOrReceive.value,
          currencyPayOrReceive.codeKey,
          code,
          currencyData,
          (configCurrency[code]?.toFixed || 2)
        )
      }));      

    }
    if(type === "payOrReceiveCurrencies")    
    // Atualiza currencyPayOrReceive
    if (currency.value) {
      setCurrencyPayOrReceive((prev) => ({
        ...prev,
        value: convertPayOrReceiveGlobal(
          currency.value,
          currency.codeKey,
          code,
          currencyData,
          (configCurrency[code]?.toFixed || 2)
        )
      }));      
    }
  };
  // Formatação do valor
  const formatCurrency = (value) => {
    value = value.replace(/[^0-9,/.]/g, "");
    return value.replace(',', '.'); // Converte vírgula em ponto
  };

  // Atualiza o campo 'currency' e converte o valor
  const handleInputChangeCurrency = (event) => {
    let value = event.target.value;
    value = formatCurrency(value); // Formata o valor    
    setCurrency((prev) => ({
      ...prev,
      value: value,
    }));

    if (currency.value) {
      //alert(currencyPayOrReceive.codeKey)
      setCurrencyPayOrReceive((prev) => ({
        ...prev,
        value: convertPayOrReceiveGlobal(
          value,
          currency.codeKey,
          currencyPayOrReceive.codeKey,
          currencyData,
          (configCurrency[currencyPayOrReceive.codeKey]?.toFixed || 2)
        )
      }));
    }


  };
  // Atualiza o campo 'currencyPayOrReceive' e converte o valor
  const handleInputChangeCurrencyPayOrReceive = (event) => {
    const value = formatCurrency(event.target.value);    
    setCurrencyPayOrReceive((prev) => ({
      ...prev,
      value: value,
    }));
    if (currencyPayOrReceive.value) {
      setCurrency((prev) => ({
        ...prev,
        value: convertCurrencyGlobal(
          value,
          currencyPayOrReceive.codeKey,
          currency.codeKey,
          currencyData,
          (configCurrency[currency.codeKey]?.toFixed || 2)
        )
      }));
    }
  };


  const toggleBuySell = () => {
    setIsBuying(!isBuying); // Alterna entre true e false
  };

  return (
    <div>
      <div className="flex justify-center items-start pt-8">
        <img src="/logo192.png" alt="Imagem centralizada" className="max-w-full h-auto" />
      </div>

      <div className="max-w-sm mx-auto p-4 bg-[#ffffff05] shadow-lg rounded-lg mt-6">
        <form className="space-y-4">
          <div className="flex flex-col justify-center items-center space-y-4 w-full">

            {/* Primeira div */}
            <div className="input-currency-container cursor-text 
            flex justify-between items-center px-3 w-full max-w-xs h-[40px] 
            bg-[#ffffff4d] bg-opacity-20 transition-all rounded-full">
              <div className="flex items-center space-x-2 w-full">
                <button
                  className={`input-mode-switcher-btn select-none text-white text-[10px] px-2 py-1 rounded-full 
                    ${isBuying ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                  type="button"
                  onClick={toggleBuySell}
                  style={{ minWidth: '70px' }} // Define uma largura mínima para manter o tamanho do botão
                >
                  {isBuying ? 'Comprar' : 'Vender'}
                </button>

                <input
                  className="input-currency text-center w-full bg-[#ffffff00] text-white focus:outline-none focus:border-none 
                  h-[40px] flex items-center justify-center"
                  type="text"
                  value={currency.value|| ""}
                  onChange={handleInputChangeCurrency}
                />
                <div className="px-1"></div>
                <div className="px-2">
                  <CurrencyPopup
                    type="buyOrSellCurrencies"
                    onClose={handlePopupClose}
                  />
                </div>
              </div>
            </div>

            {/* Segunda div */}
            <div className="input-currency-container cursor-text 
            flex justify-between items-center px-3 w-full max-w-xs h-[40px] 
            bg-[#ffffff4d] bg-opacity-20 transition-all rounded-full">
              <div className="flex items-center space-x-2 w-full">
                <div className="input-currency-switcher-container text-sm px-8 py-1 rounded cursor-text">
                  <div
                    id="fiat-switcher-mode"
                    className="input-mode-switcher-btn switcher-buy-mode select-none"
                    style={{ opacity: 0, cursor: "text" }}
                  ></div>
                </div>
                <input
                  className="input-currency text-center w-full bg-[#ffffff00] text-white focus:outline-none focus:border-none 
                  h-[40px] flex items-center justify-center"
                  type="text"
                  value={currencyPayOrReceive.value|| ""}
                  onChange={handleInputChangeCurrencyPayOrReceive}
                />
                <div className="px-1"></div>
                <div className="px-2">
                  <CurrencyPopup
                    type="payOrReceiveCurrencies"
                    onClose={handlePopupClose}
                  />
                </div>
              </div>
            </div>

            {/* Botão Prosseguir Maior */}
            <div className="w-full flex justify-center">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-full transition-all"
                type="submit"
              >
                Prosseguir
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
