import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import ColorOption from './components/ColorOption';
import Viewer from './components/Viewer';

const StyledHero = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledMain = styled.div`
    display: flex;
    align-items: center;
`

const Configurator = () => {
  const { t } = useTranslation()
  const [curColor, setCurColor] = useState(null);

  const setCurrentColor = (col) => {
    setCurColor(col.hex);
  }

  return (
    <Page>
        <StyledHero>
          <Heading as="h1" scale="xxl" color="secondary">
            {t('3D Model Configurator')}
          </Heading>
        </StyledHero>

        <StyledMain>
          <Viewer />
          <ColorOption setColor={(col) => setCurrentColor(col)} />
        </StyledMain>
    </Page>
  )
}

export default Configurator
