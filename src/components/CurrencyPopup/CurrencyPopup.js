import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurrencyPopup = ({ type, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const currencies = [
    {
      type: "buyOrSellCurrencies",
      options: [
        { code: "BTC", description: "Bitcoin", img: "bitcoin-d.svg" },
        { code: "USDT", description: "US Dollar Digital", img: "usdt-d.svg" },
      ],
    },
    {
      type: "payOrReceiveCurrencies",
      options: [
        { code: "BRL", description: "Brazilian Real", img: "brl.svg" },
        { code: "EUR", description: "Euro", img: "eur.svg" },
        { code: "GBP", description: "British Pound", img: "gbp.svg" },
        { code: "USD", description: "United States Dollar", img: "usd.svg" },
      ],
    },
  ];

  const currencyGroup =
    currencies.find((group) => group.type === type)?.options || [];
  const defaultCurrency =
    currencyGroup.length > 0
      ? currencyGroup[0]
      : { code: "BTC", description: "Bitcoin", img: "bitcoin-d.svg" };

  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleCurrencySelect = (currency) => {
    setCurrentCurrency(currency);
    setIsOpen(false);
    onClose?.(type, currency.code); // Passa o type e o code ao fechar
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onClose?.(type, currentCurrency.code); // Passa o type e o code ao clicar fora
  }, [onClose, type, currentCurrency.code]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        type="button"
        className="flex items-center px-3 py-2 justify-between focus:outline-none text-[#f99402]"
      >
        <img
          src={`/img/coins/${currentCurrency.img}`}
          alt={currentCurrency.description}
          className="w-6 h-6"
          title={currentCurrency.description}
        />
        <span className="ml-1">&#9660;</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-90 z-20"
              onClick={closeDropdown}
            ></div>

            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50 cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div
                ref={dropdownRef}
                className="bg-black rounded-lg shadow-lg w-80"
              >
                <div className="p-4">
                  {currencyGroup.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency)}
                      type="button"
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-800 text-white"
                      title={currency.description}
                    >
                      <img
                        src={`/img/coins/${currency.img}`}
                        alt={currency.description}
                        className="w-6 h-6 mr-2"
                      />
                      {currency.description}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencyPopup;
