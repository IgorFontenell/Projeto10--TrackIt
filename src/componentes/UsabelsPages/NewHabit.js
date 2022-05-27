import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";


export default function NewHabit () {

    const { userInfos, setuserInfos } = useContext(InfoContext);
    
    
    const [newHabitInfo, setNewHabitInfo] = useState({
        name: "",
        days: ""
    });
    
    console.log(newHabitInfo);

    function attDays (day) {
        
        setNewHabitInfo({
            ...newHabitInfo, ["days"]: [...newHabitInfo.days, day],
        });
    }
    function attName(e) {
        setNewHabitInfo({
            ...newHabitInfo, ["name"]:  e.target.value,
        });
    }

    function sendInfo () {

        
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfos.token}`
            }
        }; 
        
        const requisiton = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newHabitInfo, config);
        requisiton.then(() => {
            alert("Hábito enviado com sucesso!")
            console.log(requisiton)});

        requisiton.catch((err) => alert(`${err.response.status} - ${err.response.data.message}`));
    }

    return (
        <Box>
            <input type="name" placeholder="nome do hábito" onChange={attName}></input>
            <Squares>
                <span onClick={() => attDays(7)}>D</span>
                <span onClick={() => attDays(1)}>S</span>
                <span onClick={() => attDays(2)}>T</span>
                <span onClick={() => attDays(3)}>Q</span>
                <span onClick={() => attDays(4)}>Q</span>
                <span onClick={() => attDays(5)}>S</span>
                <span onClick={() => attDays(6)}>S</span>
            </Squares>
            <ConfigBox>
                <span>Cancelar</span>
                <span onClick={sendInfo}>Salvar</span>
            </ConfigBox>
        </Box>
    );

}

const Box = styled.div`

    background-color: #FFFFFF;
    width: 100%;
    padding: 0px 15px;
    min-height: 90px;
    margin: 8px 0px;
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    

    input {
        margin: 15px 0px;
        padding-left: 8px;
        color: grey;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        border: 1px solid #D4D4D4;
        height: 45px;
        width: 100%;
        border-radius: 6px;
    }
`;

const Squares = styled.div`

    display: flex;

    span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: #FFFFFF;
        margin: 10px 2px;
        border-radius: 5px;
        font-size: 20px;
        border: 1px solid #D4D4D4;
        color: #DBDBDB;
    }
    span:hover {
        cursor: pointer;
        background-color: gray;
    }
`;

const ConfigBox = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
        display: inline-block;
        width: 84px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;

    }

    span:first-child {
        margin-right: 20px;
        color: #52B6FF;
    }

    span:nth-child(2) {
        background-color: #52B6FF;
        color: #FFFFFF;
    }
`;
