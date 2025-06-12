import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import { useFrame } from "@react-three/fiber";

export default function Model({ visible = true, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/hot_air_balloon_optimized.glb"
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (animations.length > 0 && visible) {
      actions[animations[0].name]?.play();
    } else {
      actions[animations[0].name]?.stop();
    }
  }, [actions, animations, visible]);

  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 50 });

  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (!visible || !group.current) return;

    group.current.position.y = ySpring.get();
  });

  if (!visible) return null;
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={props.scale || 1.3}
      position={props.position || [1.3, -1, 0.7]}
    >
      <group name="Sketchfab_Scene" rotation={[-0.5, 1, 0]}>
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_17"
          geometry={nodes.Object_17.geometry}
          material={materials.material0}
          skeleton={nodes.Object_17.skeleton}
          position={[0, -0.472, 0]}
          scale={0.021}
        />
        <primitive object={nodes.GLTF_created_1_rootJoint} />
        <skinnedMesh
          name="Object_32"
          geometry={nodes.Object_32.geometry}
          material={materials.material0}
          skeleton={nodes.Object_32.skeleton}
          position={[0, -0.468, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.021}
        />
        <mesh
          name="Object_36"
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials.material0_1}
          position={[-0.002, 0.664, 0]}
          scale={0.866}
        />
        <primitive object={nodes.GLTF_created_2_rootJoint} />
        <skinnedMesh
          name="Object_43"
          geometry={nodes.Object_43.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_43.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_45"
          geometry={nodes.Object_45.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_45.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_47"
          geometry={nodes.Object_47.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_47.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_49"
          geometry={nodes.Object_49.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_49.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_51"
          geometry={nodes.Object_51.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_51.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_53"
          geometry={nodes.Object_53.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_53.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_55"
          geometry={nodes.Object_55.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_55.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_57"
          geometry={nodes.Object_57.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_57.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_59"
          geometry={nodes.Object_59.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_59.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_61"
          geometry={nodes.Object_61.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_61.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
        <skinnedMesh
          name="Object_63"
          geometry={nodes.Object_63.geometry}
          material={materials.Skin_MAT}
          skeleton={nodes.Object_63.skeleton}
          position={[0.022, -0.168, 0.009]}
          rotation={[0, -1.515, 0]}
          scale={0.001}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/hot_air_balloon_optimized.glb");
