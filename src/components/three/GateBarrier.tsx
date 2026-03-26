import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface GateBarrierProps {
  position: [number, number, number]
  threshold: number
  label: string
  color: string
  passed?: boolean
  active?: boolean
}

export function GateBarrier({ position, threshold, label, color, passed, active = true }: GateBarrierProps) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t) * 0.1
    ringRef.current.rotation.z = t * 0.5
  })

  const ringColor = passed === true ? '#22c55e' : passed === false ? '#e11d48' : color

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.6, 0.04, 16, 64]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={active ? 0.8 : 0.2}
          transparent
          opacity={active ? 0.7 : 0.2}
        />
      </mesh>
      <Html position={[0, 1, 0]} center distanceFactor={8}>
        <div className="text-center pointer-events-none select-none whitespace-nowrap">
          <div className="text-[10px] font-body" style={{ color: ringColor }}>{label}</div>
          <div className="text-lg font-display font-bold" style={{ color: ringColor }}>
            {threshold.toFixed(1)}
          </div>
        </div>
      </Html>
    </group>
  )
}
