import { useContext, useEffect } from "react";
import axios from "axios";
import Top from "./Top";
import styled from "styled-components";
import Habit from "./Habit";
import InfoContext from "../APIContext/InforContext";
import NewHabit from "./NewHabit";



export default function LayoutHabits () {

    // Getting the user infos
    const { userInfos, setuserInfos } = useContext(InfoContext);

    // Creating the token that validates my acess to the API
    const config = {
        headers: {
            "Authorization": `Bearer ${userInfos.token}`
        }
    }
    // Getting the API information about the user only once, I shaw get the array and translate to the component using map
    useEffect ((() =>{
        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        // requisition.then(ans => console.log(ans));

    }), []);




    return(
        <Container>
            <Top />
            <LittleTop>
                <h1>Meus hábitos</h1>
                    <ion-icon name="add-outline"></ion-icon>
            </LittleTop>
            <Habits>
                <NewHabit />
                <Habit />
            </Habits>
        </Container>
        
    );
}

const Container = styled.div`
    
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #E5E5E5;
    

    
`;

const LittleTop = styled.div`

    margin-top: 95px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    margin-bottom: 10px;

    h1 {
       
        color: #126BA5;
        font-family: 'Roboto', sans-serif;
        font-size: 23px;
        
    }
    ion-icon {
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        color: #FFFFFF;
        border-radius: 5px;
    }

`;
const Habits = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 0px 15px;

`;