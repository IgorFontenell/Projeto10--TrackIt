import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Bottom from "../Top-Bot/Bottom";
import Top from "../Top-Bot/Top";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";
import TodayHabit from "./TodayHabit";
import * as dayjs from 'dayjs'
import DoneContext from "../APIContext/DoneContext";


// We are creating the page with the Todays habits
export default function TodayPage () {
    
    // Creating the state variable that is going to att our HTML
    const [habits, setHabits] = useState([{
        id: "",
        name: "",
        done: "",
        currentSequence: "",
        highestSequence: ""
    }]);

    // Here we are getting the function that att the value of the States's variable of the number of habits completed today.
    const { habitsDone , setHabitsDone } = useContext(DoneContext);
    
    // This is the function that gets the value in the api of the number of tasks completed and att in the State's variable with the proper config.
    function attHabitsDone () {
        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        requisition.then(ans => {
                const doneHabits = ans.data.filter(object => object.done).length;
                const totalHabits = ans.data.length;
                if(totalHabits === 0){
                setHabitsDone (0);
                } else {
                    setHabitsDone (Math.ceil((doneHabits/totalHabits)*100));
                }
                });

    }
    


    // Getting back the infos about the user
    const { userInfos } = useContext(InfoContext);

    // Creating the Token to acess the server
    const config = {
        headers: {
            "Authorization": `Bearer ${userInfos.token}`
        }
    }

    // Getting the server information about the habits only once and att in the state variable
    useEffect((() => {
        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        requisition.then(ans => {
            
            setHabits(ans.data);
            attHabitsDone();
            
        });
    }), []);


    function DayOfToday () {
        let today = dayjs();
        if (today.format("dddd") === "Monday") {
            return (`Segunda,  ${today.format("DD/MM")}`)
        } else if (today.format("dddd") === "Tuesday") {
            return (`Terça,  ${today.format("DD/MM")}`)
        } else if (today.format("dddd") === "Wednesday") {
            return (`Quarta,  ${today.format("DD/MM")}`)
        } else if (today.format("dddd") === "Thursday") {
            return (`Quinta,  ${today.format("DD/MM")}`)
        } else if (today.format("dddd") === "Friday") {
            return (`Sexta,  ${today.format("DD/MM")}`)
        } else if (today.format("dddd") === "Sartuday") {
            return (`Sábado,  ${today.format("DD/MM")}`)
        } else if (today.format("dddd") === "Sunday") {
            return (`Domingo,  ${today.format("DD/MM")}`)
        }
    }

    // Creating the function that will return all the Habit's components. It will be this function that we will write in the return
    function TodayHabitList () {


        return (habits.map(data => <TodayHabit key={data.id} title={data.name} id={data.id} done={data.done} currentSequence={data.currentSequence} highestSequence={data.highestSequence} attHabitsDone={attHabitsDone} />));

    }
    
    

    return (
        <Container>
            <Top />
            <h1><DayOfToday /></h1>
            {habitsDone === 0 ? <h2>Nenhum hábito concluído ainda</h2> : <h3>{habitsDone}% dos hábitos concluídos</h3>}
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
       margin-top: 15px;
    }
    h3 {
       font-family: 'Roboto', sans-serif;
       font-size: 20px;
       color: #8FC549;
       display: inline-block;
       margin-bottom: 25px;
    }
    
`;


