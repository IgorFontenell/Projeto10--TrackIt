import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InfoContext from "../APIContext/InforContext";

export default function Top () {

    const { userInfos, setUserInfos } = useContext(InfoContext);
    return (
        <Link to="/">
        <TopDiv>
            <span>TrackIt</span>
            <img src={userInfos.image} width="51" height="51" />
        </TopDiv>
        </Link>
        );
}

const TopDiv = styled.div`

    position: fixed;
    top: 0px;
    left:0px;
    height: 70px;
    width: 100%;
    background-color: #126BA5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-shadow: 0px 0px 6px 2px grey;

    span {
    color: #FFFFFF;
    font-size: 39px;
    font-family: 'Roboto', sans-serif;
    
    }
    img {
    border-radius: 100px;
    border: 1px solid #000000;
    }

`;