import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {angleToRadians} from "@/utils/angle";

export default function Ball() {

    // Code to move the camera around
    const orbitControlsRef = useRef(null);
    useFrame((state) => {
        if (!!orbitControlsRef.current) {
            const { x, y } = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
            orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
            orbitControlsRef.current.update();
        }
    })

    // Animation
    const ballRef = useRef(null);
    useEffect(() => {
        if (!!ballRef.current) {

            // Timeline
            const timeline = gsap.timeline({ paused: true });

            // x-axis motion
            timeline.to(ballRef.current.position, {
                x: 1,
                duration: 4,
                ease: "power2.out"
            });

            // y-axis motion
            timeline.to(ballRef.current.position, {
                y: 0.5,
                duration: 1,
                ease: "bounce.out"
            }, "<");

            // Play
            timeline.play();
        }
    }, [ballRef.current])

    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />

            {/* Ball */}
            <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
            </mesh>

            {/* Floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
                <planeGeometry args={[40, 20]} />
                <meshStandardMaterial color="#867979" />
            </mesh>

            {/* Ambient light */}
            <ambientLight args={["#d92626", 0.25]} />

            {/* Spotlight light */}
            <spotLight args={["#d92626", 2, 7, angleToRadians(45), 0.4]} position={[-3, 1, 0]} castShadow />
        </>
    )
}
