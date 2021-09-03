import React, { Suspense } from 'react'
import { Button, Modal } from '@pancakeswap/uikit'
import { ModalActions } from 'components/Modal'
import { useTranslation } from 'contexts/Localization'
import { Canvas, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styled from 'styled-components'
import Controls from './THREE/Controls';
import Model from './THREE/Model';
import Loader from './UI/Loader';

import {
  ambientLightProps,
  cameraProps,
  controlsProps,
  modelProps,
  pointLightProps,
  models,
  BackPaths
} from '../utils/constant';

interface View3DNftModalProps {
  onDismiss?: () => void
}

const StyledCanvasWrapper = styled.div`
    height: 600px;
    background-color: #CECFCA;
    margin-top: 10px;
    width: 800px;
`

const View3DNftModal: React.FC<View3DNftModalProps> = ({ onDismiss}) => {
  const { t } = useTranslation()

  const Dome = () => {
    const texture = useLoader(THREE.TextureLoader, BackPaths[0])
    return (
        <mesh>
        <sphereBufferGeometry attach="geometry" args={[50, 100, 100]} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
        </mesh>
    )
  }

  const ShowModel = () => {
    const model = useLoader(GLTFLoader, models[4].modelPath);
    const { nodes, animations } = model;

    return (
      <Model
          data={{ 
              'setModel': () => true,
              'setColor': () => true,
              'setCurName': () => true,
              'curSpeed': 1,
              'animations': animations,
              'nodes': nodes,
              'colors': {}
          }}
          position={modelProps.position}
          castShadow
      />
    );
  }

  return (
    <Modal title='Clown' onDismiss={onDismiss}>
      <StyledCanvasWrapper>
          <Canvas
              camera={{ fov: cameraProps.fov, position: cameraProps.position }}
          >
              <ambientLight intensity={ambientLightProps.intensity} />
              <pointLight
                  position={pointLightProps.position}
                  castShadow
                  decay={pointLightProps.decay}
                  shadow-mapSize-height={pointLightProps.shadowMapSize}
                  shadow-mapSize-width={pointLightProps.shadowMapSize}
              />
              <Controls
                  maxPolarAngle={controlsProps.maxPolarAngle}
                  minPolarAngle={controlsProps.minPolarAngle}
                  maxDistance={controlsProps.maxDistance}
                  minDistance={controlsProps.minDistance}
                  target={controlsProps.target}
                  enableKeys
              />
              <Suspense fallback={<Loader />}>
                  <Dome />
                  <ShowModel />
                  
              </Suspense>
          </Canvas>
      </StyledCanvasWrapper>

      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" >
          {t('Close')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default View3DNftModal
