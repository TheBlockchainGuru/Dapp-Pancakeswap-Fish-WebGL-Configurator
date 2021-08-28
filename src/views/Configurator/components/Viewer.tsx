import React, { Suspense, useEffect, useState, RefObject, useRef } from 'react';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import Controls from './THREE/Controls';
import Model from './THREE/Model';
import Loader from './UI/Loader';

import {
    ambientLightProps,
    cameraProps,
    controlsProps,
    groundProps,
    modelProps,
    pointLightProps,
    models,
    exportPath,
  } from '../utils/constant';

const StyledViewer = styled.div`
    width: 80%;
    border-right: 1px solid #CECFCA;
    padding: 10px;
    text-align: center;
`
const StyledCanvasWrapper = styled.div`
    height: 650px;
    background-color: #CECFCA;
    margin-top: 10px;
`

const Viewer = () => {
    const { t } = useTranslation()  

    const [sceneData, setSceneData] = useState({});
    const [ animationData, setAnimationData ] = useState({});

    const superheroElement: RefObject<typeof Model> = React.createRef<typeof Model>();

    const exporter = new GLTFExporter();

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

        exporter.parse( sceneData, function ( gltf ) {
            const output = JSON.stringify( gltf, null, 2 );
            saveString( output, 'scene.gltf' );
        }, {trs: true, forceIndices: true, includeCustomExtensions: true, animations: animationData} );
    }

    const setModel = (data) => {
        const { scene, animations, materials } = data;
        setSceneData(scene);
        setAnimationData(animations);
    }

    return (
        <StyledViewer>
            <Button variant="primary" onClick={() => { exportModel(); }}>
                  {t('Export Model')}
            </Button>
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
                        target={controlsProps.target}
                        enableKeys
                    />
                    <Suspense fallback={<Loader />}>
                        <Model
                        ref={superheroElement}
                        data={{ 
                            'modelPath': models[1].modelPath,
                            'setModel': setModel,
                        }}
                        position={modelProps.position}
                        castShadow
                        />
                    </Suspense>
                </Canvas>
            </StyledCanvasWrapper>
        </StyledViewer>
    )
}

export default Viewer