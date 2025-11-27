import { useForm } from "../hooks/useForm";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const Tasks = () => {
  const { values, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [editingTask, setEditingTask] = useState({
    idTask: "",
    active: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/tasks-by-user", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setTasks(data);
        } else {
          setMessage("error al cargar las tareas");
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setMessage("error de conexión");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  //logica para crear las tareas
  const postTask = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          is_completed: values.is_completed,
        }),
      });
      console.log(response);
      if (response.ok) {
        setMessage("Tarea creada exitosamente");
        handleReset();
      } else {
        setMessageError("Error en crear la tarea");
        handleReset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //logica para eliminar las tareas
  const deleteTasks = async (idTask) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idTask}`, {
        method: "DELETE",
        credentials: "include",
      });
      // console.log(res);
      if (res.ok) {
        setMessage("tarea eliminada correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessageError("error al eliminar la tarea");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setMessage("error de conexion");
      console.log(error);
    }
  };
  //logica para editar tareas
  const setEditing = (idTask) => {
    setEditingTask({
      active: true,
      idTask: idTask,
    });
  };
  const putTask = async (idTask, { e }) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idTask}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          is_completed: values.is_completed
        }),
      });
      if (res.ok) {
        setMessage("tarea actualizada con exito");
        handleReset();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessageError("error al actualizar la tarea");
        handleReset();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setMessageError("error de conexion");
    }
  };
  const markCompleted = async (idTask, newIsCompletedStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idTask}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          is_completed: newIsCompletedStatus, // Enviar el nuevo estado directamente
        }),
      });
      const responseData = await res.json(); // Esperar la resolución del JSON
      console.log(responseData);

      if (res.ok) {
        // setMessage("Tarea actualizada como completada/incompleta.");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === idTask ? { ...task, is_completed: newIsCompletedStatus } : task
          )
        );
      } else {
        setMessageError("Error al actualizar la tarea.");
      }
    } catch (error) {
      setMessageError("Error de conexión: " + error.message);
      console.error(error);
    }
  };

  if (isloading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!createTask && !editingTask.active && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Lista de Tareas
          </h1>
          <div className="bg-green-100 text-green-800 border-green-300">
            {message}
          </div>
          <div className="bg-red-100 text-red-800 border-red-300">
            {messageError}
          </div>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {message}
          </h2>

          {tasks.length === 0 ? (
            <p className="test-center text-gray-600">
              No hay tareas disponibles
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 p-4 rounded-md shadow-sm mb-4 flex justify-between items-center"
              >
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_completed"
                    id="is_completed"
                    checked={
                      task.is_completed
                    }
                    onChange={(e) => {
                      markCompleted(task.id, e.target.checked); // Pasar el nuevo estado del checkbox
                    }}
                    className="peer hidden"
                  />
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300 bg-white peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 ease-in-out flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="ml-2 text-gray-700">Completed</span>
                </label>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditing(task.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      deleteTasks(task.id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}

          <button
            onClick={() => {
              setCreateTask(true);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
          >
            Crear Nueva Tarea
          </button>
          <br />
          <br />
          <br />
        </div>
      )}
      {createTask && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <form className="space-y-4">
            {/* mensaje de exito */}
            <div className="'bg-green-100 text-green-800 border-green-300'">
              {message}
            </div>
            {/* mensaje de error */}
            <div className="'bg-red-100 text-red-800 border-red-300'">
              {messageError}
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                value={values.title}
                onChange={handleChange}
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  onClick={postTask}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Tarea
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreateTask(false);
                    window.location.reload(true);
                  }}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* seccion para editar la tarea */}
      {editingTask.active && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            editar tarea
          </h1>
          <form className="space-y-4">
            {/* mensaje de exito */}
            <div className="'bg-green-100 text-green-800 border-green-300'">
              {message}
            </div>
            {/* mensaje de error */}
            <div className="'bg-red-100 text-red-800 border-red-300'">
              {messageError}
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                value={values.title}
                onChange={handleChange}
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  onClick={() => {
                    putTask(editingTask.idTask);
                  }}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Tarea
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTask({
                      idTask: "",
                      active: false,
                    });
                    window.location.reload(true);
                  }}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};