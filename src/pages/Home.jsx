import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useState } from "react";
export const Home = () => {
  const { profile, setProfile } = useProfile();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total : "",
    completed: "",
    incompleted: ""
  })
  useEffect(() => {
    const response = async () => {
      try {
        const data = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        const res = await data.json();
        console.log(res.user.name);
        setProfile(res.user.name);
      } catch (error) {
        setProfile("Guest");
        console.log(error);
      }
    };
    response();
  }, []);
  console.log(tasks)

  const getTasks = async () =>{
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user",{
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();

      if(res.ok){
        setTasks(data);
        const totalTasks = data.length;
        const completedTasks = data.filter(
          (task) => task.is_completed
        ).length;
        const incompletedTasks = totalTasks - completedTasks;

        setStats({
          total: totalTasks,
          completed: completedTasks,
          incompleted: incompletedTasks
        })

      }else{
        console.log("No se pudo obtener las tareas");
      }

    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  
  return (
    <div className="items-center flex justify-center">
      <h1 className="font-bold mt-10 text-5xl">Bienvenido, {profile}</h1>
      <h2 className="font-bold mt-10 text-5xl">Tareas</h2>
      <div>
        <p>Total de tareas: {stats.total}</p>
        <p>Tareas completadas: {stats.completed}</p>
        <p>Tareas incompletadas: {stats.incompleted}</p>
      </div>
    </div>
  );
};
