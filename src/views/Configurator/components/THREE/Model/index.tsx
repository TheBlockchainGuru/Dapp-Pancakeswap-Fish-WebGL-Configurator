import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps extends MeshProps {
  data: {
    setModel: (model: any) => void;
    setColor: (col: any) => void;
    setCurName: (name: any) => void;
    curSpeed: any;
    nodes: any;
    colors: any;
    animations: any;
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
    data: { setModel, setCurName, curSpeed, nodes, colors, animations },
  } = props;

  const group = useRef()

  const actions: actions = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer(group));

  useEffect(() => {
    setModel({ 'scene': group.current });
  }, [ setModel ]);

  useEffect(() => {
    if( animations.length ) {
      actions.current = {
        idle: mixer.clipAction(animations[0], group.current),
      };
      actions.current.idle.play();
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))

  }, [animations, mixer]);

  useFrame((_, delta) => mixer.update(delta * curSpeed));

  return (
    <group ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[4.08, 1.01, 5.9]} rotation={[-0.27, 0.6, 1.93]} />
        <group position={[0.01, 0.37, 0.02]}>
          <primitive object={nodes.Armature_rootJoint} />
            {
              Object.keys(nodes).map((name) => {
                return nodes[name].isSkinnedMesh ? (
                  <skinnedMesh
                    key={nodes[name].uuid}
                    geometry={nodes[name].geometry}
                    material={nodes[name].material}
                    skeleton={nodes[name].skeleton}
                    material-color={colors[name] ? colors[name] : '#ffffff'}
                    onClick={(e) => { setCurName(name); e.stopPropagation() }}
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
