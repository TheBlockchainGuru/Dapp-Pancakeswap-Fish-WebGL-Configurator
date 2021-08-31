import React, { useEffect, useRef, useState } from 'react';
import { useLoader, MeshProps, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

interface ModelProps extends MeshProps {
  data: {
    modelPath: string;
    setModel: (model: any) => void;
    curColor: string;
    setColor: (col: any) => void;
    curName: string;
    setCurName: (name: any) => void;
    curSpeed: any;
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
    data: { modelPath, setModel, curColor, setColor, curName, setCurName, curSpeed },
  } = props;

  const group = useRef()
  
  const model = useLoader(GLTFLoader, modelPath);
  const { nodes, animations } = model;

  const actions: actions = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer(group));
  const [colors, setColors] = useState( localStorage.getItem('con_colors') ? localStorage.getItem('con_colors') : {});

  useEffect(() => {
    setModel({ 'scene': group.current, 'animations': animations });

    const temp = {};
    Object.keys(nodes).forEach(name => {
      if( nodes[name].isSkinnedMesh )
        temp[name] = colors[name] ? colors[name] : '#ffffff'
    });
    setColors(temp);
  }, [model, setModel, colors, nodes, animations]);

  useEffect(() => {
    if( animations.length ) {
      actions.current = {
        idle: mixer.clipAction(animations[0], group.current),
      };
      actions.current.idle.play();
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))

  }, [animations, mixer]);

  useEffect(() => {
    const temp = {...colors};
    temp[curName] = curColor;
    setColors(temp);
  }, [curColor, colors, curName]);

  useFrame((_, delta) => mixer.update(delta * curSpeed));

  return (
    <group ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[4.08, 1.01, 5.9]} rotation={[-0.27, 0.6, 1.93]} />
        <group position={[0.01, 0.37, 0.02]}>
          <primitive object={nodes.Armature_rootJoint} />
            {
              Object.keys(nodes).map((name, index) => {
                return nodes[name].isSkinnedMesh ? (
                  <skinnedMesh
                    key={nodes[name].uuid}
                    geometry={nodes[name].geometry}
                    material={nodes[name].material}
                    skeleton={nodes[name].skeleton}
                    material-color={colors[name]}
                    onClick={(e) => { setCurName(name); setColor( colors[name] ); e.stopPropagation() }}
                  />
                ) : null;
              })
            }
         </group>
      </group>
    </group>
  );
};

export default Model;
