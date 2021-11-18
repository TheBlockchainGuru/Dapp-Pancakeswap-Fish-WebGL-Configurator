import React, { Suspense, useState } from 'react';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { Button, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
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

const StyledViewer = styled.div`
    width: 60%;
    border-left: 1px solid #CECFCA;
    border-right: 1px solid #CECFCA;
    padding: 10px;
    text-align: center;
`
const StyledCanvasWrapper = styled.div`
    height: 550px;
    background-color: #CECFCA;
    margin-top: 10px;
`

const StyledElementWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    overflow: auto;
`

type ChildProps = {
    curColor: string,
    setColor: (arg0: string) => void,
    curName: string,
    setCurName: (arg0: string) => void
    curSpeed: any,
    curBack: any,
    colors: any,
}

const StyledElement = styled.div`
    width: 150px;
    background-size: cover;
    height: 100px;
    border: 0px solid #f1416c;
    margin-top: 10px;
    margin-left: 15px;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
    }
`

const Viewer : React.FC<ChildProps> = ({setColor, curName, setCurName, curSpeed, curBack, colors}) => {
    const { t } = useTranslation()

    const [ sceneData, setSceneData ] = useState(localStorage.getItem('con_sceneData') ? localStorage.getItem('con_sceneData') : {});
    const [ animationData, setAnimationData ] = useState(localStorage.getItem('con_animationData') ? localStorage.getItem('con_animationData') : {});

    const exporter = new GLTFExporter();

    const model = useLoader(GLTFLoader, models[11].modelPath);
    console.log(model);
    const { nodes, animations } = model;

    const exportModel = () => {
        const link = document.createElement( 'a' );
        link.style.display = 'none';
        document.body.appendChild( link ); // Firefox workaround, see #6594

        function save( blob, filename ) {

            link.href = URL.createObjectURL( blob );
            link.download = filename;
            link.click();
        }

        function saveString( text, filename ) {
            save( new Blob( [ text ], { type: 'text/plain' } ), filename );
        }

        exporter.parse( sceneData, ( gltf ) => {
            const output = JSON.stringify( gltf, null, 2 );
            saveString( output, 'scene.gltf' );
        }, {trs: true, forceIndices: true, includeCustomExtensions: true, 'animations': animationData} );
    }

    const setModel = (data) => {
        const { scene } = data;
        
        setSceneData(scene);
        setAnimationData(animations);
        
        localStorage.setItem('con_sceneData', scene);
        localStorage.setItem('con_animationData', animations);
    }

    const Dome = () => {
        const texture = useLoader(THREE.TextureLoader, BackPaths[curBack])
        return (
            <mesh>
            <sphereBufferGeometry attach="geometry" args={[50, 100, 100]} />
            <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
            </mesh>
        )
    }
    
    const imageURL = (name) => `url(${models[4].elementPath[name]})`

    return (
        <StyledViewer>
            <Button variant="primary" onClick={() => { exportModel(); }}>
                  {t('Export Model')}
            </Button>
            <Text fontSize="25px">{ t( curName ) }</Text>
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
                        <Model
                            data={{ 
                                'setModel': setModel,
                                'setColor': setColor,
                                'setCurName': setCurName,
                                'curSpeed': curSpeed,
                                'animations': animations,
                                'nodes': nodes,
                                'colors': colors
                            }}
                            position={modelProps.position}
                            castShadow
                        />
                        {/* <primitive object={model.scene} /> */}
                    </Suspense>
                </Canvas>
            </StyledCanvasWrapper>

            <StyledElementWrapper>
            {
                Object.keys(nodes).map((name) => {
                    return nodes[name].isSkinnedMesh || nodes[name].isMesh ? (
                        <StyledElement 
                            onClick={() => {setCurName(name)}}
                            key={nodes[name].uuid}
                            style={{ backgroundImage: imageURL(name), borderWidth: name === curName ? 5 : 0 }}>
                            {/* 123 */}
                        </StyledElement>
                    ) : null;
                })
            }
            </StyledElementWrapper>
        </StyledViewer>
    )
}

export default Viewer