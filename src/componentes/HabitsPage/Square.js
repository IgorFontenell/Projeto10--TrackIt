import { useState } from "react";
import styled from "styled-components";

export default function Square ( { value, number, newHabitInfo, setNewHabitInfo } ) {

    const [selected, setSelected] = useState(false);

    // Here, we update the infos about the days that were selected.
    function attDays () {
        setNewHabitInfo({
            ...newHabitInfo, ["days"]: [...newHabitInfo.days, number],
        });
        setSelected(!selected);
        
    }

    
    

return(
        <SquareSpan selected={selected}  onClick={attDays}>{value}</SquareSpan>
);

}

const SquareSpan = styled.span`

        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: ${props => props.selected ? 'lightgrey' : '#FFFFFF'};
        margin: 10px 2px;
        border-radius: 5px;
        font-size: 20px;
        border: 1px solid #D4D4D4;
        color: ${props => props.selected ? "#FFFFFF" : "#D4D4D4"};
       
    

`
