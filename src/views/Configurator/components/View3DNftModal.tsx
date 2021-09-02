import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap/uikit'
import { ModalActions, ModalInput } from 'components/Modal'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import Viewer from 'views/Configurator/components/Viewer';

interface View3DNftModalProps {
  onDismiss?: () => void
}

const View3DNftModal: React.FC<View3DNftModalProps> = ({ onDismiss}) => {
  // const [val, setVal] = useState('')
  // const { toastSuccess, toastError } = useToast()
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
    <Modal title='Clown' onDismiss={onDismiss}>
      <Viewer 
        curColor={curColor}
        setColor={(col) => setCurrentColor(col)}
        curName={curName}
        setCurName={(name) => setCurrentName(name)}
        curSpeed={curSpeed}
        curBack={curBack}
        colors={colors}
        />

      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" >
          {t('Close')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default View3DNftModal
