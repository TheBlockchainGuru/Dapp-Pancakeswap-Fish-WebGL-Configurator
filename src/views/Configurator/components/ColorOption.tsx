import React from 'react'
import styled from 'styled-components'
import { ChromePicker } from 'react-color';
import { Slider, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

type ChildProps = {
    setColor: (arg0: string) => void,
    curColor: string,
    setSpeed: (arg0: any) => void,
    curSpeed: any,
}

const Option: React.FC<ChildProps> = ({setColor, curColor, setSpeed, curSpeed}) => {
    const { t } = useTranslation()  

    const StyledOption = styled.div`
        width: 20%;
        padding: 10px;
        text-align: center;
    `

    const StyledTestArea = styled.div`
        background-color: ${curColor};
        width: 100%;
        height: 200px;
        margin-bottom: 20px;
    `

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    return (
        <StyledOption>
            <Text mb="10px" fontSize="20px">
                { t('Select Color') }
            </Text>
            <StyledTestArea>
                {/* <h1>'</h1> */}
            </StyledTestArea>
            <ChromePicker 
                color={ curColor }
                onChange={ handleChangeComplete }
                />

            <Text mt="50px" mb="10px" fontSize="20px">
                { t('Animation Speed') }
            </Text>
            <Slider
                min={1}
                max={5}
                value={curSpeed}
                onValueChanged={(ev) => { setSpeed(ev); }}
                name="stake"
                valueLabel={`${curSpeed}x`}
                step={0.1}
            />
        </StyledOption>
    )
}

export default Option