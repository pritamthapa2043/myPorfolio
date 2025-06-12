import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import { useFrame } from "@react-three/fiber";

export default function HotAirBallon({ visible = true, ...props }) {
  const group = useRef(null);
  const { nodes, materials, animations } = useGLTF(
    "/models/animated_airplanes_circling_hot_air_balloon_loop.glb"
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
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-0.5, 1, 0]} scale={0.515}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[0, 0, 0]}>
              <group
                name="Aerobatic_aeroplane_97"
                position={[0, -0.917, 0]}
                scale={4}
              >
                <group name="Aerobatic_aeroplane_Skeleton_94" scale={0.01}>
                  <group name="geo1_0" />
                  <group name="skeletal3_1">
                    <group name="GLTF_created_0">
                      <primitive object={nodes.GLTF_created_0_rootJoint} />
                      <skinnedMesh
                        name="Object_17"
                        geometry={nodes.Object_17.geometry}
                        material={materials.material0}
                        skeleton={nodes.Object_17.skeleton}
                      />
                      <group name="aerobatic_plane2_98_correction">
                        <group name="aerobatic_plane2_98" />
                      </group>
                    </group>
                  </group>
                </group>
              </group>
              <group
                name="Aerobatic_aeroplane_99"
                position={[0, -0.91, 0]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={4}
              >
                <group name="Aerobatic_aeroplane_Skeleton_(1)_95" scale={0.01}>
                  <group name="geo1_8" />
                  <group name="skeletal3_9">
                    <group name="GLTF_created_1">
                      <primitive object={nodes.GLTF_created_1_rootJoint} />
                      <skinnedMesh
                        name="Object_32"
                        geometry={nodes.Object_32.geometry}
                        material={materials.material0_0}
                        skeleton={nodes.Object_32.skeleton}
                      />
                      <group name="aerobatic_plane2_100_correction">
                        <group name="aerobatic_plane2_100" />
                      </group>
                    </group>
                  </group>
                </group>
              </group>
              <group
                name="Hot_air_balloon_101"
                position={[0, -0.392, 0]}
                scale={12.097}
              >
                <group name="RootNode0_16" scale={0.01}>
                  <group name="hot_air_balloon1_102">
                    <mesh
                      name="Object_36"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_36.geometry}
                      material={materials.material0_1}
                    />
                  </group>
                </group>
              </group>
              <group
                name="Waving_(1)_103"
                position={[0.043, -0.327, 0.018]}
                rotation={[0, -1.515, 0]}
                scale={0.2}
              >
                <group
                  name="bossMeshes_17"
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={0.01}
                />
                <group name="Waving_(1)_Skeleton_96" scale={0.01}>
                  <group name="GLTF_created_2">
                    <primitive object={nodes.GLTF_created_2_rootJoint} />
                    <skinnedMesh
                      name="Object_43"
                      geometry={nodes.Object_43.geometry}
                      material={materials.Skin_MAT}
                      skeleton={nodes.Object_43.skeleton}
                    />
                    <skinnedMesh
                      name="Object_45"
                      geometry={nodes.Object_45.geometry}
                      material={materials.Cigar_Mat}
                      skeleton={nodes.Object_45.skeleton}
                    />
                    <skinnedMesh
                      name="Object_47"
                      geometry={nodes.Object_47.geometry}
                      material={materials["Clothes_MAT.001"]}
                      skeleton={nodes.Object_47.skeleton}
                    />
                    <skinnedMesh
                      name="Object_49"
                      geometry={nodes.Object_49.geometry}
                      material={materials.Skin_MAT}
                      skeleton={nodes.Object_49.skeleton}
                    />
                    <skinnedMesh
                      name="Object_51"
                      geometry={nodes.Object_51.geometry}
                      material={materials.Clothes_MAT}
                      skeleton={nodes.Object_51.skeleton}
                    />
                    <skinnedMesh
                      name="Object_53"
                      geometry={nodes.Object_53.geometry}
                      material={materials["Eyes_MAT.001"]}
                      skeleton={nodes.Object_53.skeleton}
                    />
                    <skinnedMesh
                      name="Object_55"
                      geometry={nodes.Object_55.geometry}
                      material={materials["Clothes_MAT.001"]}
                      skeleton={nodes.Object_55.skeleton}
                    />
                    <skinnedMesh
                      name="Object_57"
                      geometry={nodes.Object_57.geometry}
                      material={materials.Eyes_MAT}
                      skeleton={nodes.Object_57.skeleton}
                    />
                    <skinnedMesh
                      name="Object_59"
                      geometry={nodes.Object_59.geometry}
                      material={materials["Clothes_MAT.001"]}
                      skeleton={nodes.Object_59.skeleton}
                    />
                    <skinnedMesh
                      name="Object_61"
                      geometry={nodes.Object_61.geometry}
                      material={materials.Skin_MAT}
                      skeleton={nodes.Object_61.skeleton}
                    />
                    <skinnedMesh
                      name="Object_63"
                      geometry={nodes.Object_63.geometry}
                      material={materials.Skin_MAT}
                      skeleton={nodes.Object_63.skeleton}
                    />
                    <group name="bossArms_Geo_104" />
                    <group name="bossCigar_Geo_105" />
                    <group name="bossHat_Geo_106" />
                    <group name="bossHead_Geo_107" />
                    <group name="bossJacket_Geo_108" />
                    <group name="bossL_Eye_Geo_109" />
                    <group name="bossPants_Geo_110" />
                    <group name="bossR_Eye_Geo_111" />
                    <group name="bossShoes_Geo_112" />
                    <group name="bossTeeth_Down_Geo_113" />
                    <group name="bossTeeth_Up_Geo_114" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/animated_airplanes_circling_hot_air_balloon_loop.glb");
