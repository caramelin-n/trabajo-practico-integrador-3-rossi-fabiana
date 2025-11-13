import logo from '../assets/img/logo.webp'
import { useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-yellow-400 text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-white transition">Inicio</a>
            <a href="#" className="hover:text-white transition">Acerca de</a>
            <a href="#" className="hover:text-white transition">Servicios</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>

          {/* Botón */}
          <div className="hidden md:block">
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Login
            </button>
          </div>

          {/* Hamburguesa Mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden flex flex-col space-y-1"
          >
            <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="#" className="block py-2 hover:text-white transition">Inicio</a>
            <a href="#" className="block py-2 hover:text-white transition">Acerca de</a>
            <a href="#" className="block py-2 hover:text-white transition">Servicios</a>
            <a href="#" className="block py-2 hover:text-white transition">Contacto</a>
            <button className="w-full mt-4 bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}