import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

import {
    BackPaths
  } from '../utils/constant';

type ChildProps = {
    curBack: any,
    setBack: (arg0: any) => void,
}

const StyledBackSelector = styled.div`
        width: 20%;
        padding: 10px;
        text-align: center;
    `
const StyledBackImage1 = styled.div`
    width: 90%;
    margin-left: 5%;
    background-image: url(${ BackPaths[0] });
    background-size: cover;
    height: 230px;
    margin-bottom: 10px;
    margin-top: 10px;
    border: 0px solid #f1416c;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
    }
`
const StyledBackImage2 = styled.div`
    width: 90%;
    margin-left: 5%;
    background-image: url(${ BackPaths[1] });
    background-size: cover;
    height: 230px;
    margin-bottom: 10px;
    border: 0px solid #f1416c;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
        border-width: 5px;
    }
`
const StyledBackImage3 = styled.div`
    width: 90%;
    margin-left: 5%;
    background-image: url(${ BackPaths[2] });
    background-size: cover;
    height: 230px;
    border: 0px solid #f1416c;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
    }
`

const BackSelector: React.FC<ChildProps> = ({curBack, setBack}) => {
    const { t } = useTranslation()  

    return (
        <StyledBackSelector>
            <Text mb="10px" fontSize="20px">
                { t('Select Background') }
            </Text>
            
            <StyledBackImage1
                style={{ borderWidth: curBack === 0 || curBack === '0' ? 5 : 0 }}
                onClick={() => {setBack(0)}}>
                {/* first Back */}
            </StyledBackImage1>
            <StyledBackImage2 
                style={{ borderWidth: curBack === 1 || curBack === '1' ? 5 : 0 }}
                onClick={() => {setBack(1)}}>
                {/* second Back */}
            </StyledBackImage2>
            <StyledBackImage3 
                style={{ borderWidth: curBack === 2 || curBack === '2' ? 5 : 0 }}
                onClick={() => {setBack(2)}}>
                {/* third Back */}
            </StyledBackImage3>
        </StyledBackSelector>
    )
}

export default BackSelector