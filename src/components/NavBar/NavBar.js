import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-2 shadow-lg w-full bg-opacity-10">
      <div className="container mx-auto flex justify-center">
        <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6 text-lg">
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
    </nav>
  );
};

export default NavBar;
