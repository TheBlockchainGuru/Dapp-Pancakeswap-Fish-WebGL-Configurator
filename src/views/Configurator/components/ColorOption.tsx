import React, {useState} from 'react'
import styled from 'styled-components'
import { ChromePicker } from 'react-color';

type ChildProps = {
    setColor: (arg0: string) => void
}

const Option: React.FC<ChildProps> = ({setColor}) => {
    const [backColor, setBackColor] = useState({hex: '#123'});
    
    const StyledOption = styled.div`
        width: 20%;
        padding: 10px;
        text-align: center;
    `

    const StyledTestArea = styled.div`
        background-color: ${backColor.hex};
        width: 100%;
        height: 200px;
        margin-bottom: 20px;
    `

    const handleChangeComplete = (color) => {
        setBackColor(color);
        setColor(color.hex);
    };

    return (
        <StyledOption>
            <StyledTestArea>
                {/* <h1>'</h1> */}
            </StyledTestArea>
            <ChromePicker 
                color={ backColor }
                onChange={ handleChangeComplete }
                />
        </StyledOption>
    )
}

export default Option