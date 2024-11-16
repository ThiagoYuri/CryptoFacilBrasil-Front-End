import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-2 shadow-lg w-full bg-opacity-10">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* Botão de hambúrguer para dispositivos móveis */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none mb-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Menu Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:flex md:items-center`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-lg">
            <li>
              <Link to="/" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
                Termos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
