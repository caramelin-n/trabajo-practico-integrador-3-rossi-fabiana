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
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading/>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Perfil</h1>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg"><span className="font-semibold text-yellow-600">Id:</span> {profile.id}</p>
          <p className="text-lg"><span className="font-semibold text-yellow-600">Nombre:</span> {profile.name}</p>
          <p className="text-lg"><span className="font-semibold text-yellow-600">Apellido:</span> {profile.lastname}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
