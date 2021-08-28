import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useLoader, MeshProps, useFrame } from '@react-three/fiber';
import { useRender } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

interface ModelProps extends MeshProps {
  data: {
    modelPath: string;
    setModel: (model: any) => void;
  };
}

interface actions {
  current: {
    idle: {
      play: () => void,
    };
  };
}

const Model: (props: ModelProps) => JSX.Element | null = (props) => {
  const {
    data: { modelPath, setModel },
  } = props;
  
  const model = useLoader(GLTFLoader, modelPath);

  const { scene, animations, materials } = model;

  const geometries = useMemo(() => {
    const temp = []
    scene.traverse(child => child.isMesh && temp.push(child.geometry))
    return temp
  }, [scene]);

  const materialList = Object.keys(materials).map((name, idx) => {
    return materials[name];
  });

  const actions: actions = useRef();

  const sceneMesh = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer(scene));

  useEffect(() => {
    setModel(model);
  }, [model, setModel]);

  useEffect(() => {
    if( animations.length ) {
      actions.current = {
        idle: mixer.clipAction(animations[0]),
      };
      actions.current.idle.play();
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))

  }, [animations, mixer]);

  useFrame((_, delta) => mixer.update(delta));

  return (
    // <mesh>
    //   {
    //     geometries.map((geom, index) => 
    //       <mesh 
    //         key={geom.uuid} 
    //         position={center} 
    //         geometry={geom} 
    //         castShadow 
    //         receiveShadow
    //         material={materialList[0]} />)
    //   }
    // </mesh>
    <primitive object={scene} ref={sceneMesh} />
  );
};

export default Model;
