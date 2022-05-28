import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components"


export default function Bottom () {


    return (
        <BottomDiv>
            <Link to="/habitos">
                <span>Hábitos</span>
            </Link>
            <Link to="/hoje">
                <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={66}  text={"Hoje"} strokeWidth={10} background
                        backgroundPadding={6}
                        styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })} /> 
                    </div>
           </Link>
            <span>Histórico</span>
        </BottomDiv>);


}

const BottomDiv = styled.div`

    width: 100%;
    height: 70px; 
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 6px 2px grey;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
        color: #52B6FF;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        display: inline-block;
        
    }
    span:nth-child(1){
        margin-right: 25px;
    }
    span:nth-child(3){
        margin-left: 25px;
    }

    div {
        position: fixed;
        bottom: 10px;
        left: 36%;
        width: 100px;
        height: 70px;
         
    }
`;