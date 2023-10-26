import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function EarthModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./models/earth3.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Sphere.geometry}
        material={materials["Material.001"]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("./models/earth3.glb");