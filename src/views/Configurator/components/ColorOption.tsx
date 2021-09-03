import React from 'react'
import styled from 'styled-components'
import { HexColorPicker } from "react-colorful";
import { Slider, Text, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

type ChildProps = {
    setColor: (arg0: string) => void,
    curColor: string,
    setSpeed: (arg0: any) => void,
    curSpeed: any,
}

const StyledOption = styled.div`
    width: 20%;
    padding: 10px;
    text-align: center;
`

const StyledTestArea = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
`

const Option: React.FC<ChildProps> = ({setColor, curColor, setSpeed, curSpeed}) => {
    const { t } = useTranslation();

    const handleChangeComplete = (color) => {
        setColor(color);
    };

    return (
        <StyledOption>
            <Text mb="10px" fontSize="20px">
                { t('Select Color') }
            </Text>
            <StyledTestArea style={{backgroundColor: curColor}}>
                {/* <h1>'</h1> */}
            </StyledTestArea>
            <HexColorPicker 
                color={ curColor }
                onChange={ handleChangeComplete }
                style={{ marginLeft: '50%', transform: 'translate3d(-50%, 0, 0)' }}
                />
            <Text mb="10px" fontSize="20px">
                { t(curColor) }
            </Text>

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

            <Button variant="primary" onClick={() => { console.log('1'); }} style={{ marginTop: 50, backgroundColor: '#b64e4e' }}>
                  {t('Reset Setting')}
            </Button>
        </StyledOption>
    )
}

export default Option