import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";

export const Home = () => {
  const { profile, setProfile } = useProfile();

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

  return (
    <div className="items-center flex justify-center">
      <h1 className="font-bold mt-10 text-5xl">Bienvenido, {profile}</h1>
    </div>
  );
};
