import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";
import Square from "./Square";
import { ThreeDots } from  'react-loader-spinner'

export default function NewHabit ( { setCreateHabit, reload } ) {

    // Here, we are getting the UserInfos saved
    const { userInfos } = useContext(InfoContext);
    
    const [isLoading, setIsLoading] = useState(false);

    function IsButton () {

        if (isLoading === false) {
            return (
                <>
                <span onClick={cancel}>Cancelar</span>
                <span onClick={sendInfo}>Salvar</span>
                </>
                
            );
        } else if (isLoading === true) {
            return (
                <>
                <span>Cancelar</span>
                <span><ThreeDots color="#FFFFFF" height={30} width={30} /></span>
                </>
            );
        }

    }
    
    // Here, we created the state variable so we can stock the value of the creating Habit
    const [newHabitInfo, setNewHabitInfo] = useState({
        name: "",
        days: ""
    });
    
    // Here, we Att the name of the habit  that were written
    function attName(e) {
        setNewHabitInfo({
            ...newHabitInfo, ["name"]:  e.target.value,
        });
    }
    
    function cancel() {
        setCreateHabit(false);
        setNewHabitInfo({
            name: "",
            days: ""
        });
    }
    

    // Here, we create the toke to acess the server(config variable) and send to the server the infos that we colected, with the the token
    function sendInfo () {
        if (newHabitInfo.name === "" || newHabitInfo.days === "") {
            alert("Dados incompletos, favor terminar o preenchimento")
        } else {
            setIsLoading(true);
            const config = {
                headers: {
                    "Authorization": `Bearer ${userInfos.token}`
                }
            }; 
            const requisiton = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newHabitInfo, config);
            requisiton.then(() => {
                setIsLoading(false);
                alert("Hábito enviado com sucesso!");
                cancel();
                reload();
                });
    
            requisiton.catch((err) => alert(`${err.response.status} - ${err.response.data.message}`));
        }
        
    }

    return (
        <Box disabled>
            <input type="name" placeholder="nome do hábito" onChange={attName}></input>
            <Squares>
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="D" number={7} />
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="S" number={1} />
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="T" number={2} />
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="Q" number={3} />
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="Q" number={4} />
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="S" number={5} />
                <Square newHabitInfo={newHabitInfo} setNewHabitInfo={setNewHabitInfo} value="S" number={6} />
            </Squares>
            <ConfigBox>
                <IsButton />
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
