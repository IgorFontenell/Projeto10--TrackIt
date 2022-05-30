import { useContext } from "react";
import styled from "styled-components";
import Bottom from "../Top-Bot/Bottom";
import Top from "../Top-Bot/Top";
import InfoContext from "../APIContext/InforContext";


export default function HistoryPage () {

    // Getting back the infos about the user.
    const { userInfos } = useContext(InfoContext);

    // Creating the Token to acess the server.
    const config = {
        headers: {
            "Authorization": `Bearer ${userInfos.token}`
        }
    }

    


    return (
        <Container>
            <Top />
            <h1>Histórico</h1>
            <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
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
       color: #666666;
       display: inline-block;
       margin-top: 15px;
    }
    
`;


