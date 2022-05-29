import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InfoContext from "./APIContext/InforContext";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";
import LayoutHabits from "./HabitsPage/LayoutHabits";
import DoneContext from "./APIContext/DoneContext";
import TodayPage from "./TodayHabits/TodayPage";



export default function App () {

    const [userInfos, setUserInfos] = useState({
        email: "",
        name: "",
        image: "",
        password: "",
        token: ""
    });
    
    const [habitsDone, setHabitsDone] = useState(0);

    return (

        <DoneContext.Provider value={{habitsDone, setHabitsDone}} >
        <InfoContext.Provider value={{userInfos, setUserInfos}} >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} /> 
                <Route path="/habitos" element={<LayoutHabits />} />
                <Route path="/hoje" element={<TodayPage />} />
            </Routes>
        </BrowserRouter>
        </InfoContext.Provider>
        </DoneContext.Provider>

    );

}