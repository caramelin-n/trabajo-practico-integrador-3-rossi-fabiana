import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useState } from "react";

export const Home = () => {
  const { profile, setProfile } = useProfile();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: "",
    completed: "",
    incompleted: "",
  });

  useEffect(() => {
    const response = async () => {
      try {
        const data = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        const res = await data.json();
        setProfile(res.user.name);
      } catch (error) {
        setProfile("Guest");
        console.log(error);
      }
    };
    response();
  }, []);

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setTasks(data);
        const totalTasks = data.length;
        const completedTasks = data.filter((task) => task.is_completed).length;
        const incompletedTasks = totalTasks - completedTasks;

        setStats({
          total: totalTasks,
          completed: completedTasks,
          incompleted: incompletedTasks,
        });
      } else {
        console.log("No se pudo obtener las tareas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <section className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Bienvenido, {profile || "Invitado"}
          </h1>
          <p className="mt-4 text-gray-600">
            Aquí tienes el resumen de tus tareas
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition">
            <div className="text-sm font-medium text-gray-500">Total</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {stats.total ?? 0}
            </div>
          </div>
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition">
            <div className="text-sm font-medium text-gray-500">Completadas</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {stats.completed ?? 0}
            </div>
          </div>
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition">
            <div className="text-sm font-medium text-gray-500">Pendientes</div>
            <div className="mt-2 text-3xl font-bold text-amber-600">
              {stats.incompleted ?? 0}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800">Tus tareas</h2>
          {tasks.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed bg-white/60 p-6 text-gray-600">
              No hay tareas por ahora.
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <li
                  key={task.id ?? `${task.title}-${task.is_completed}`}
                  className="rounded-xl border bg-white p-4 flex items-center justify-between shadow-sm"
                >
                  <span className="font-medium text-gray-900">
                    {task.title || task.name || "Tarea"}
                  </span>
                  <span
                    className={`text-sm inline-flex items-center px-3 py-1 rounded-full ring-1 ${
                      task.is_completed
                        ? "bg-green-50 text-green-700 ring-green-200"
                        : "bg-amber-50 text-amber-700 ring-amber-200"
                    }`}
                  >
                    {task.is_completed ? "Completada" : "Pendiente"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
