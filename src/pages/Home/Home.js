// Home.js
import React, { useState } from 'react';
import CurrencyDropdown from '../../components/CurrencyDropdown/CurrencyDropdown';

const Home = () => {
  const [currency, setCurrency] = useState("0,0018559"); // Valor inicial
  const [currencyPayOrReceive, setCurrencyPayOrReceive] = useState("1"); // Valor inicial
  const [isBuying, setIsBuying] = useState(true); // Novo estado para alternar entre comprar e vender

  const handleInputChangeCurrency = (event) => {
    setCurrency(event.target.value);     
  };

  const handleInputChangeCurrencyPayOrReceive = (event) => {
    setCurrencyPayOrReceive(event.target.value);
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

            {/* Primeira div (já está no padrão desejado) */}
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
                  value={currency}
                  onChange={handleInputChangeCurrency}
                />
                <div className="px-1"></div>
                <div className="px-2">
                  <CurrencyDropdown type="buyOrSellCurrencies" />
                </div>
              </div>
            </div>

            {/* Segunda div com os mesmos estilos da primeira */}
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
                  value={currencyPayOrReceive}
                  onChange={handleInputChangeCurrencyPayOrReceive}
                />
                <div className="px-1"></div>
                <div className="px-2">
                  <CurrencyDropdown type="payOrReceiveCurrencies" />
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
