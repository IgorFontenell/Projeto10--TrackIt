import { useContext } from "react";
import styled from "styled-components";
import FixedSquare from "./FixedSquare";
import axios from "axios";
import InfoContext from "../APIContext/InforContext";


export default function Habit ( { name, id, days, reload } ) {
    let allDays = [1, 2, 3, 4, 5, 6, 7];
    let newData = [];
    const {userInfos} = useContext(InfoContext);

    function verification () {
     newData = allDays.map(num => {
            if (days.includes(num)) {
                return true;
            } else {
                return false;
            }

       });
    }

    function Delete () {
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfos.token}`
            }
        }
        let requisition = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        requisition.then(() => reload());
    }

    verification();
    return(
        <Box id={id}>
            <span>{name}</span>
            <ion-icon name="trash-outline" onClick={Delete}></ion-icon>
            <Squares>
                <FixedSquare selected={newData[6]} value="D"></FixedSquare>
                <FixedSquare selected={newData[0]} value="S"></FixedSquare>
                <FixedSquare selected={newData[1]} value="T"></FixedSquare>
                <FixedSquare selected={newData[2]} value="Q"></FixedSquare>
                <FixedSquare selected={newData[3]} value="Q"></FixedSquare>
                <FixedSquare selected={newData[4]} value="S"></FixedSquare>
                <FixedSquare selected={newData[5]} value="S"></FixedSquare>
            </Squares>
        </Box>
    );


}

const Box = styled.div`

    background-color: #FFFFFF;
    width: 100%;
    padding-left: 8px;
    min-height: 90px;
    flex-wrap: wrap;
    margin: 6px 0px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;

    > span {
        display: inline-block;
        margin-top: 5px;
        padding-left: 4px;
        color: #666666;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
    }
    > ion-icon {
        font-size: 16px;
        position: absolute;
        top: 8px;
        right: 12px;
    }
`;

const Squares = styled.div`

    display: flex;

`;

