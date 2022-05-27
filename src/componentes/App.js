import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InfoContext from "./APIContext/InforContext";
import Login from "./FrontPages/Login";
import Register from "./FrontPages/Register";
import Habits from "./UsabelsPages/LayoutHabits";


export default function App () {

    const [userInfos, setUserInfos] = useState({
        email: "",
        name: "",
        image: "",
        password: "",
        token: ""
    });

    return (
        <InfoContext.Provider value={{userInfos, setUserInfos}} >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} /> 
                <Route path="/habitos" element={<Habits />} />

            </Routes>
        </BrowserRouter>
        </InfoContext.Provider>


    );

}