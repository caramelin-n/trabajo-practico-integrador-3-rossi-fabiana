import { Routes } from "react-router";
import { Route } from "react-router";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Login } from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Tasks from "../pages/Tasks";
import { Home } from "../pages/Home";
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer";

const AppRouter = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route element={<PublicRoute/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<Login/>} />
            <Route path="/" element={<Login/>} />
        </Route>
        <Route element={<PrivateRoute/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="*" element={<Home/>} />
            <Route path="/" element={<Home/>} />
        </Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default AppRouter
