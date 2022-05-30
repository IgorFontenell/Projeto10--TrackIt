import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import Logo from "../Libary/Logo.png";
import { ThreeDots } from  'react-loader-spinner'

export default function Register () {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

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

    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function attForms (e) {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
        
    }
    console.log(form);
    
    function loginInto (event) {
        event.preventDefault();
        setIsLoading(true);

        const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form);
        requisition.then(ans => {
            navigate("/");
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
            <form onSubmit={loginInto}>
                <input type="email" name="email" placeholder="email" onChange={attForms} value={form.description} required />
                <input type="password" name="password" placeholder="senha" onChange={attForms} value={form.description} required />
                <input type="text" name="name" placeholder="nome" onChange={attForms} value={form.description} required />
                <input type="url" name="image" placeholder="foto" onChange={attForms} value={form.description} required />
                <IsButton />
            </form>
            <Link to="/" >
                <span>Já tem uma conta? Faça login!</span>
            </Link>
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
        margin-top: 25px;
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid grey;
        border-radius: 5px;
        margin-bottom: 10px;
        span {
            color: #FFFFFF;
            font-size: 21px;
            font-family: 'Roboto', sans-serif;
        }
    }
    a {
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