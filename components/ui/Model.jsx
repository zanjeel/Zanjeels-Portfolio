import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const Model = ({ animationName = 'Idle2', ...props }) => {
    const group = useRef();

    const { scene } = useGLTF('/animations/model.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);

    const { animations: idleAnimation } = useFBX('animations/Idle2.fbx');
    const { animations: saluteAnimation } = useFBX('animations/MeetingFemale.fbx');
    const { animations: clappingAnimation } = useFBX('animations/clapping.fbx');
    const { animations: victoryAnimation } = useFBX('animations/Talking_0.fbx');

    idleAnimation[0].name = 'Idle2';
    saluteAnimation[0].name = 'MeetingFemale';
    clappingAnimation[0].name = 'clapping';
    victoryAnimation[0].name = 'Talking_0';

    const { actions, mixer } = useAnimations(
        [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0]],
        group,
    );

    // useEffect(() => {
    //   actions[animationName].reset().fadeIn(0.5).play();
    //   return () => actions[animationName].fadeOut(0.5);
    // }, [animationName]);

    useEffect(() => {
        if (actions[animationName]) {
            actions[animationName]
                .reset()
                .fadeIn(mixer?.stats?.actions?.inUse === 0 ? 0 : 0.5)
                .play();
        }

        return () => {
            if (actions[animationName]) {
                actions[animationName].fadeOut(0.5);
            }
        };
    }, [animationName, actions, mixer]);

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={nodes.Hips} />
            <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
            <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
            <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
            <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
            <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
    )
}


useGLTF.preload('/animations/model.glb');
export default Model;

