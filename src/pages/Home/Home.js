// Home.js
import React, { useState } from 'react';
import CurrencyDropdown from '../../components/CurrencyDropdown/CurrencyDropdown';

const Home = () => {
  const [currency, setCurrency] = useState("0,0018559"); // Valor inicial

  const handleInputChange = (event) => {
    setCurrency(event.target.value); // Atualiza o estado com o valor do input
  };

  return (
    <div>
      <div class="flex justify-center items-start pt-8">
        <img src="/logo192.png" alt="Imagem centralizada" class="max-w-full h-auto" />
      </div>

      <div class="max-w-sm mx-auto p-4 bg-[#ffffff05] shadow-lg rounded-lg mt-6">
        <form className="space-y-4">
          <div className="flex flex-col justify-center items-center space-y-4 w-full">

            {/* Primeira div (já está no padrão desejado) */}
            <div className="input-currency-container cursor-text 
            flex justify-between items-center px-3 w-full max-w-xs h-[40px] 
            bg-[#ffffff4d] bg-opacity-20 transition-all rounded-full">
              <div className="flex items-center space-x-2 w-full">
                <button
                  className="input-mode-switcher-btn select-none switcher-buy-mode text-white
              bg-green-600 hover:bg-green-700 text-[10px] px-2 py-1 rounded-full"
                  type="button"
                >
                  Comprar
                </button>

                <input
                  className="input-currency text-center w-full bg-[#ffffff00] text-white focus:outline-none focus:border-none 
                  h-[40px] flex items-center justify-center" // Remover bordas ao focar e garantir centralização
                  type="text"
                  value={currency}
                  onChange={handleInputChange}
                />
                <div className="px-1"></div>
                <div className="px-2">
                  <CurrencyDropdown type={"buyOrSellCurrencies"} />
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
                  h-[40px] flex items-center justify-center" // Remover bordas ao focar e garantir centralização
                  type="text"
                  value={currency}
                  onChange={handleInputChange}
                />
                <div className="px-1"></div>
                <div className="px-2">
                  <CurrencyDropdown type={"payOrReceiveCurrencies"} />
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
