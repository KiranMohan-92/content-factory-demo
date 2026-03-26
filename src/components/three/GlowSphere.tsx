import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface GlowSphereProps {
  position: [number, number, number]
  color: string
  label?: string
  sublabel?: string
  radius?: number
  active?: boolean
  onClick?: () => void
  pulsate?: boolean
}

export function GlowSphere({
  position,
  color,
  label,
  sublabel,
  radius = 0.3,
  active = true,
  onClick,
  pulsate = true,
}: GlowSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current || !pulsate) return
    const t = clock.getElapsedTime()
    const scale = active ? 1 + Math.sin(t * 2) * 0.05 : 0.5
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.8 : 0.2}
          transparent
          opacity={active ? 0.9 : 0.3}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.1 : 0.02} />
      </mesh>
      {label && (
        <Html position={[0, radius + 0.5, 0]} center distanceFactor={8}>
          <div className="text-center pointer-events-none select-none whitespace-nowrap">
            <div className="text-xs font-display font-bold" style={{ color }}>{label}</div>
            {sublabel && <div className="text-[10px] text-muted-foreground">{sublabel}</div>}
          </div>
        </Html>
      )}
    </group>
  )
}
