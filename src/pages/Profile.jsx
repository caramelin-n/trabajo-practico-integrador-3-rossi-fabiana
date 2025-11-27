import { useState } from "react"
import { useEffect } from "react";
import { Loading } from "../components/Loading"

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    lastname: ""
  });
  const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        const fetchData = async () =>{
          try {
            setIsLoading(true)
            const res = await fetch("http://localhost:3000/api/profile",
              {method: "GET", credentials: "include"}
            )
            const data = await res.json()
            console.log(data.user);
            setProfile({
              id: data.user.id,
              name: data.user.name,
              lastname: data.user.lastname
            })
          } catch (error) {
            console.log(error);
            setIsLoading(false)
          } finally{
            setIsLoading(false)
          }
        };
        fetchData();
      },[]);

  if(isLoading){
    return(<Loading/>)
  }
  return (
    <div>
      <h1>Perfil</h1>
      <p>Id: {profile.id}</p>
      <p>Nombre: {profile.name}</p>
      <p>Apellido: {profile.lastname}</p>
    </div>
  )
}

export default Profile
