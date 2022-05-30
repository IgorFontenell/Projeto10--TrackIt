import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Top from "../Top-Bot/Top";
import styled from "styled-components";
import Habit from "./Habit";
import InfoContext from "../APIContext/InforContext";
import NewHabit from "./NewHabit";
import Bottom from "../Top-Bot/Bottom";



export default function LayoutHabits () {

    // We are creating a State variable that represent the act of tring to creat a habit.
    const [createHabit, setCreateHabit] = useState("false");

    // We are creating a State variable that keeps the information about  the habits that we are getting from the API.
    const [habitsInfo, setHabitsInfo] = useState([]);
    
    // Getting the user infos
    const { userInfos } = useContext(InfoContext);

    // Creating the token that validates my acess to the API.
    const config = {
        headers: {
            "Authorization": `Bearer ${userInfos.token}`
        }
    }
    // Getting the API information about the user only once, and update the state variable with it.
     useEffect ((() =>{
         const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
         requisition.then(ans => {
             setHabitsInfo(ans.data);
         });

     }), []);

     // Function that gets again the information in the API and rewrit it, we are going to use it always when some change in the API happens.
     function reload () {

        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
         requisition.then(ans => {
             setHabitsInfo(ans.data);
         });


     }

    // The function that actualy writes each habit to be written.
    function CallingHabit () {

      return  habitsInfo.map(value => <Habit name={value.name} key={value.id} id={value.id} days={value.days} reload={reload} />);

    }
    // Function called when there is no habbit created yet.
    function NoHabit () {
        return (<span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>);
    }
        
    




    return(
        <Container>
            <Top />
            <LittleTop>
                <h1>Meus hábitos</h1>
                    <ion-icon name="add-outline" onClick={() => setCreateHabit(true)}></ion-icon>
            </LittleTop>
            <Habits>
                {(createHabit === true) ? <NewHabit reload={reload} setCreateHabit={setCreateHabit} /> : <></>} 
                {(habitsInfo.length !== 0) ?  <CallingHabit /> : <NoHabit /> }
            </Habits>
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
    padding-bottom: 25px;
    margin-bottom: 70px;
    

    
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
        font-weight: bold;
        
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

    > span {
        display: inline-block;
        margin-top: 15px;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        color: #666666;
    }

`;