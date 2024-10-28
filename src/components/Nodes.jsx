import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from 'three';

const Nodes = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF('/models/Armature.glb');

  useEffect(() => {
    console.log('Nodes component rendered');
    console.log('Nodes:', nodes);  }, [nodes]);
    const visualizeBone = (bone, color = 'red') => {
      console.log('Visualizing bone:', bone.name);
      const position = bone.getWorldPosition(new THREE.Vector3());
      console.log('Bone position:', position);
      return (
        <mesh position={position}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      );
    };
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={1}>
        {Object.entries(nodes).map(([key, node]) => {
  if (node.isBone) {
    console.log('Rendering bone:', key);
    return (
      <group key={key}>
        <primitive object={node} />
        {visualizeBone(node)}
      </group>
    );
  }
  return null;
})}
        </group>
      </group>
    </group>
  );
};

export default Nodes;