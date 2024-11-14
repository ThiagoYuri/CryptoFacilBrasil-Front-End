
import React from "react";

const NavBar = () => {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-2 shadow-lg w-full bg-opacity-10">
      <div className="container mx-auto flex justify-center">

        {/* Links da Navbar */}
        <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6 text-lg">
          <li>
            <a href="1" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
              Início
            </a>
          </li>
          <li>
            <a href="2" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
              Sobre
            </a>
          </li>
          <li>
            <a href="3" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
              Termos
            </a>
          </li>
          <li>
            <a href="3" className="text-center block py-2 px-4 hover:bg-gray-800 rounded transition-colors duration-200">
              Contato
            </a>
          </li>
        </ul>

      </div>
    </nav>


  );
};

NavBar.propTypes = {};

NavBar.defaultProps = {};



export default NavBar;
