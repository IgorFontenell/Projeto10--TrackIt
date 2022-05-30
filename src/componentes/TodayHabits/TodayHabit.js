import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";

// Here we are creating the function that writes each Today Habit Box
export default function TodayHabit ( { title, done, id, currentSequence, highestSequence, attHabitsDone } ) {
    
    
    // Creating the variable of state that tell us if the Habit were done today
    const[isDone, setIsDone] = useState(done);
    

    // Getting the user information
    const{ userInfos } = useContext(InfoContext);

     // Creating the Token to acess the API
     const config = {
        headers: {
            "Authorization": `Bearer ${userInfos.token}`
        }
    }

    
    



    // Function called to tell the API that the habit were completed
    function attAPI () {

        // Here we are creating the 2 situations about the habit selected.
        //If the isDone === false, means that we are selecting it to change it to be complet. We are sendding the information to the API to change the status of it.
        if (isDone === false) {
            let requisition = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config);
            requisition.then(() => {
                setIsDone(!isDone);
                attHabitsDone();
            });
            requisition.catch(err => alert(`${err.response.status} - ${err.response.data.message}`));

          //If the isDone === true, means that we are deselectin it to change it to be yet done. We are sendding the information to the API to change the status of it. 
        } else if (isDone === true) {
            let requisition = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config);
            requisition.then(() => {
                setIsDone(!isDone);
                attHabitsDone();
            });
            requisition.catch(err => alert(err.response.status - err.response.data.message));
        }
    }
    
    return (
            <Box done={isDone} id={id} onClick={attAPI} isEqual={currentSequence === highestSequence}>
                <Content>
                    <span>{title}</span>
                    <span>{`Sequência atual: ${currentSequence}`}</span>
                    <span>{`Seu record: ${highestSequence}`}</span>
                </Content>
                <ion-icon name="checkbox"></ion-icon>
            </Box>
            );
}

const Box = styled.div`

    background-color: #FFFFFF;
    border-radius: 5px;
    width: 100%;
    height: 94px;
    display: flex;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;

    ion-icon {
        width: 80px;
        height: 80px;
        color: ${props => props.done ? "#8FC549" : "#E7E7E7"};
    }
`;

const Content = styled.div`

    display: flex;
    flex-direction: column;
    color: #666666;

    span {
        display: inline-block;
        font-family: 'Roboto', sans-serif;
    }
    span:nth-child(1) {
        font-size: 20px;
        margin-bottom: 15px;
    }
    span:nth-child(2) {
        font-size: 13px;
        margin-bottom: 5px;
        color: ${props => props.done ? "#8FC549" : "#666666"};
        
    }
    span:nth-child(3) {
        font-size: 13px;
        color: ${props => (props.done && props.isEqual) ? "#8FC549" : "#666666"};
    }


`;