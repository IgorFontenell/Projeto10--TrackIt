import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";


export default function TodayHabit ( { title, done, id, currentSequence, highestSequence } ) {
    
    const[isDone, setIsDone] = useState(done);
    const{userInfos, setUserInfos} = useContext(InfoContext);

    function attAPI () {
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfos.token}`
            }
        }; 
        if (isDone === false) {
            let requisition = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, config);
            requisition.then(() => {
                setUserInfos(!isDone)
                alert("Tarefa Concluída!");
            });
            requisition.catch(err => alert(err.response.status - err.response.data.message));
        } else if (isDone === true) {
            let requisition = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, config);
            requisition.then(() => {
                setUserInfos(!isDone)
                alert("Tarefa Desmarcada!");
            });
            requisition.catch(err => alert(err.response.status - err.response.data.message));
        }
    }
    
    return (
            <Box done={isDone} id={id} onClick={attAPI}>
                <Content>
                    <span>{title}</span>
                    <span>{`Sequência atual ${currentSequence}`}</span>
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
    }
    span:nth-child(3) {
        font-size: 13px;
    }


`;