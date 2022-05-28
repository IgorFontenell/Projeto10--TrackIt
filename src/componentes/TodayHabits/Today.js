import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Bottom from "../Top/BotBars/Bottom";
import Top from "../Top/BotBars/Top";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";
import TodayHabit from "./TodayHabit";


export default function Today() {

    const [habits, setHabits] = useState([{
        id: "",
        name: "",
        done: "",
        currentSequence: "",
        highestSequence: ""
    }]);
    const {userInfos, setUserInfos} = useContext(InfoContext);


    const config = {
        headers: {
            "Authorization": `Bearer ${userInfos.token}`
        }
    }
    
    useEffect((() => {
        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        requisition.then(ans => {
            setHabits(ans.data)
        });
    }), []);

    console.log(habits);
        
    function TodayHabitList () {

        return (habits.map(data => <TodayHabit key={data.id} title={data.name} id={data.id} done={data.done} currentSequence={data.currentSequence} highestSequence={data.highestSequence} />));

    }
    

    return (
        <Container>
            <Top />
            <h1>Sexta 27/05</h1>
            <h2>Nenhum hábito concluído ainda</h2>   
            {habits.length !== 0 ? <TodayHabitList /> : <div></div>}
            <Bottom />
        </Container>
    );

}

const Container = styled.div`
    
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #E5E5E5;
    padding: 95px 15px;
    

    h1 {
       display: inline-block;
       color: #126BA5;
       font-family: 'Roboto', sans-serif;
       font-size: 23px;
       font-weight: bold;
       margin-bottom: 6px;
   }
    h2 {
       font-family: 'Roboto', sans-serif;
       font-size: 20px;
       color: #BABABA;
       display: inline-block;
       margin-bottom: 25px;
    }
    
`;


