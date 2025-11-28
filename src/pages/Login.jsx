import {  useState } from "react";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { handleReset, handleChange, formValue } = useForm({
    username: "",
    password: "",
  });
  const { username, password } = formValue;
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(null);
  const submit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setMessage("Debe completar todos los campos.");
      return;
    }
    if (password.length < 6) {
      setMessage("La contraseña debe tener más de 6 caracteres.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setMessage(data.message || "Credenciales inválidas.");
        return;
      }

      if (data.message === "Login exitoso") {
        setLoading(false);
        setMessage("Login exitoso.");
        navigate("/home");
        return;
      } else {
        setLoading(false);
        setMessage(data.message || "Credenciales inválidas.");
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setMessage("Error de conexión");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <h1 className="font-medium text-red-700 mt-2">{message}</h1>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?
          <Link
            to="/register"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
