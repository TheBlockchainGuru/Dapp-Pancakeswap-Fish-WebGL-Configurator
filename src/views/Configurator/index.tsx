import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import ColorOption from './components/ColorOption';
import Viewer from './components/Viewer';
import BackSelector from './components/BackSelector';

const StyledHero = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledMain = styled.div`
  display: flex;
  align-items: center;
`

const StyledPage = styled.div`
  text-align: center;
`

const Configurator = () => {
  const { t } = useTranslation()
  const [curColor, setCurColor] = useState(localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff');
  const [curName, setCurName] = useState(localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.');
  const [curSpeed, setCurSpeed] = useState(localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1);
  const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0);
  const [colors, setColors] = useState( JSON.parse( localStorage.getItem('con_colors') ) ? JSON.parse( localStorage.getItem('con_colors') ) : {});

  const setCurrentColor = (col) => {
    setCurColor(col);
    localStorage.setItem('con_curColor', col);

    const temp = {...colors};
    temp[curName] = col;
    setColors(temp);
    localStorage.setItem('con_colors', JSON.stringify(colors));
  }

  const setCurrentSpeed = (speed) => {
    setCurSpeed(speed);
    localStorage.setItem('con_curSpeed', speed);
  }

  const setCurrentName = (name) => {
    setCurName(name);
    setCurColor(colors[name]);

    localStorage.setItem('con_curName', name);
  }

  const setCurrentBack = (back) => {
    setCurBack(back);
    localStorage.setItem('con_curBack', back);
  }

  return (
    <StyledPage>
        <StyledHero>
          <Heading as="h1" scale="xxl" color="secondary">
            {t('3D Model Configurator')}
          </Heading>
        </StyledHero>

        <StyledMain>
          <BackSelector
            curBack={curBack}
            setBack={setCurrentBack}
          />
          <Viewer 
            curColor={curColor}
            setColor={(col) => setCurrentColor(col)}
            curName={curName}
            setCurName={(name) => setCurrentName(name)}
            curSpeed={curSpeed}
            curBack={curBack}
            colors={colors}
            />
          <ColorOption
            setColor={(col) => setCurrentColor(col)}
            curColor={curColor}
            setSpeed={(speed) => setCurrentSpeed(speed)}
            curSpeed={curSpeed}
            />
        </StyledMain>
    </StyledPage>
  )
}

export default Configurator
