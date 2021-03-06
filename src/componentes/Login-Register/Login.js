import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Logo from "../Libary/Logo.png";
import InfoContext from '../APIContext/InforContext';
import { ThreeDots } from  'react-loader-spinner'

export default function Login () {
    // Creating the navigate function
    const navigate = useNavigate();

    // Getting the APIContext info
    const { setUserInfos } = useContext(InfoContext);
    
    const [isLoading, setIsLoading] = useState(false);

    // A function that desativates the button while waiting for the API to work. We are putting a delay gif to make more USER friendly.
    function IsButton () {

        if (isLoading === false) {
            return (
                    <button type="submit" >
                        <span>Entrar</span>
                    </button>
            );
        } else if (isLoading === true) {
            return (
                    <div className="NoButton" >
                        <ThreeDots color="#FFFFFF" height={40} width={40} />
                    </div>
            );
        }

    }
    // Estate variable that has the inputs values.
    const [ form, setForm ] = useState({
        email: "",
        password: "",
    })

    // Function called when has some changing in the input field.
    function attForms (event) {
        setForm({
            ...form, [event.target.name]: event.target.value
        });
    }

    // Here's the main function. When the user click on the button, this function is called and the things that it do are: prevent the automatic reload of the page, send the email and password to the server, update the state variable with the client infos that are in the server, navigate to the next page and send a error alert in case of failer.
    function loginInto (event) {
        event.preventDefault();
        setIsLoading(true);

        const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", form);
        requisition.then(ans => {
            
            setUserInfos({
                name: ans.data.name,
                image: ans.data.image,
                email: ans.data.email,
                password: ans.data.password,
                token: ans.data.token
            });

            navigate("/hoje");
            setIsLoading(false);
        });
        requisition.catch(err => {
            alert(`${err.response.status} - ${err.response.data.message}`);
            setIsLoading(false);
        });

    }

    
    return (
            
            <Container>
                <Link to="/" ><img src={Logo} width="180" alt="Logo TrackIt carregando" /></Link>
               <form onSubmit={loginInto} disabled>
                    <input type="email" name="email" placeholder="email" value={form.description} onChange={attForms} required />
                    <input type="password" name="password" placeholder="senha" value={form.description} onChange={attForms} required />
                    <IsButton />
                    <Link to="/cadastro" >
                        <span>N??o tem uma conta? Cadastre-se!</span>
                    </Link>
                </form>
            </Container>
    );

}

const Container = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #E5E5E5;
    height: 100vh;
    width: 100%;
    
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    img {
        width: 180px;
        margin-bottom: 20px;
    }
    
    input {
        width: 303px;
        height: 45px;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        margin-top: 10px;
    }

    button {
        margin-top: 10px;
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin-bottom: 10px;
        border: none;
        span {
            color: #FFFFFF;
            font-size: 21px;
            font-family: 'Roboto', sans-serif;
        }
    }
    a {
        display: flex;
        justify-content: center;
        color: #52B6FF;
        
    }
    span {
        color: #52B6FF;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }
    .NoButton {
        margin-top: 10px;
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin-bottom: 10px;
        border: none;
        opacity: 0.4;
    }

`;