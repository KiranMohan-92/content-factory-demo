import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface DataOrbProps {
  position: [number, number, number]
  value: string
  label: string
  color: string
  size?: number
  active?: boolean
}

export function DataOrb({ position, value, label, color, size = 0.6, active = true }: DataOrbProps) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.3
    groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Core orb */}
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.2 : 0.3}
          transparent
          opacity={active ? 0.85 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.4, 0.02, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.3 : 0.05} />
      </mesh>
      {/* Label */}
      <Html position={[0, size + 0.6, 0]} center distanceFactor={8}>
        <div className="text-center pointer-events-none select-none whitespace-nowrap">
          <div className="text-2xl font-display font-bold" style={{ color }}>{value}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
        </div>
      </Html>
    </group>
  )
}
