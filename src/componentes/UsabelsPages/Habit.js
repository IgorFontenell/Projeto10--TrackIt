import styled from "styled-components";

export default function Habit () {

    return(
        <Box>
            <span>Ler 1 capítulo de livro</span>
            <Squares>
                <span>D</span>
                <span>S</span>
                <span>T</span>
                <span>Q</span>
                <span>Q</span>
                <span>S</span>
                <span>S</span>
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
    

    span {
        padding-left: 4px;
        color: #666666;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
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
        background-color: #CFCFCF;
        margin: 0px 2px;
        border-radius: 5px;
        font-size: 20px;
        padding-right: 3px;

    }

`;

