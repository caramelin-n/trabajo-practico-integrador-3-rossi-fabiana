import { useState } from "react";
import { useForm } from "../hooks/useForm"
import { Link } from "react-router";

export const Register = () => {
  const { handleReset, handleChange, formValue } = useForm({
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  });
  const { name, lastname, email, username, password } = formValue;
  
  const { message, setMessage } = useState(null);

  const submit = async (event) => {
    event.preventDefault();

    if(!name || !lastname || !email || !username || !password){
      setMessage("Debe completar todos los campos.");
      return
    }

    if(password.length < 6){
      setMessage("La contraseña debe tener más de 6 caracteres.");
      return
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input 
              type="text" 
              name="name" 
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
              Apellido
            </label>
            <input 
              type="text" 
              name="lastname" 
              id="lastname"
              value={lastname}
              onChange={handleChange}
              placeholder="Ingresa tu apellido"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input 
              type="text" 
              name="email" 
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input 
              type="text" 
              name="username" 
              id="username"
              value={username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              name="password" 
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button 
            type="submit"
            onClick={submit}
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <h1 className="font-medium text-red-700 mt-2">{message}</h1>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta? <Link to="/login" className="text-yellow-400 font-semibold hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
