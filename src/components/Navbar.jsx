import { useEffect, useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const [ isLogged, setIsLogged ] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const fetchdata = await fetch("http://localhost:3000/api/profile", { credentials: "include" })
       console.log(fetchdata)
        if(fetchdata.ok){
          setIsLogged(true);
          return
        };
        if(!fetchdata.ok){
          setIsLogged(false)
          return
        }
      } catch (error) {
        console.log(error);
        setIsLogged(false);
      }
    }; data();
  }, [])

  return (
    <nav className="bg-yellow-400 text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold tracking-wide">
              mi proyecto con react
            </span>
          </div>

          {/* Menu Desktop */}
          { isLogged === true && (<div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/tasks" className="hover:text-white transition">Tasks</a>
            <a href="/profile" className="hover:text-white transition">Profile</a>
          </div>)}

          {/* Botones Desktop */}
          { isLogged === true && (<div className="hidden md:block">
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Logout
            </button>
          </div>)}

          { isLogged === false && (<div className="hidden md:flex space-x-4">
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Login
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Register
            </button>
          </div>)}

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

        {/* Menu Mobile - Cuando está logeado */}
        {isOpen && isLogged === true && (
          <div className="md:hidden pb-4">
            <a href="/" className="block py-2 hover:text-white transition">Home</a>
            <a href="/tasks" className="block py-2 hover:text-white transition">Tasks</a>
            <a href="/profile" className="block py-2 hover:text-white transition">Profile</a>
            <button className="w-full mt-4 bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Logout
            </button>
          </div>
        )}

        {/* Menu Mobile - Cuando NO está logeado */}
        {isOpen && isLogged === false && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <button className="w-full bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Login
            </button>
            <button className="w-full bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-50 transition">
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}