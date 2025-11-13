import { Navigate } from "react-router";
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const PublicRoute = () => {
  const [loading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const checkLogged = async () => {
      try {
        setLoading(true);
        const profile = await fetch("http://localhost:3000/api/profile");
        if (!profile.ok) {
          setLogged(false);
        }
        if (profile.ok) {
          setLogged(true);
        }
      } catch (error) {
        console.log("Error a checkear el profile.", error);
        setLogged(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogged();
  }, []);
  return loading ? (
    <Loading />
  ) : isLogged ? (
    <Navigate to={"/home"} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
