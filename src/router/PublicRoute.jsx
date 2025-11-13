import { Navigate } from "react-router";
import { Loading } from "../components/Loading"
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const PublicRoute = () => {
  const [ loading, setLoading ] = useState(true);
  const [ isLogged, setLogged ] = useState(false);

  useEffect(() => {
    const checkLogged = async () => {
        try {
            setLoading(true);
            const profile = await fetch("http://localhost:3000/api/profile");
            setLogged(!!profile)
        } catch (error) {
            console.log("Error a checkear el profile", error);
            setLogged(false);
        } finally {
            setLoading(false);
        }
        checkLogged();
    }
  },[])
  if (loading){
    return (
        <Loading/>
    )
  }
    return (
        isLogged ? <Navigate to={"/home"}/> : (<Outlet/>)
    )
}

export default PublicRoute
