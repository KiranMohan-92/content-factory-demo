import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PipelineTrackProps {
  points?: [number, number, number][]
  color?: string
  active?: boolean
  progress?: number // 0-1
}

const DEFAULT_POINTS: [number, number, number][] = [
  [-5, 0, 0],
  [-2.5, 0.5, 0],
  [0, 0, 0],
  [2.5, -0.5, 0],
  [5, 0, 0],
]

export function PipelineTrack({ points = DEFAULT_POINTS, color = '#ccff00', active = true, progress = 1 }: PipelineTrackProps) {
  const tubeRef = useRef<THREE.Mesh>(null!)
  const particleRef = useRef<THREE.Mesh>(null!)

  const curve = useMemo(() => {
    const pts = points.map(p => new THREE.Vector3(...p))
    return new THREE.CatmullRomCurve3(pts)
  }, [points])

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.03, 8, false)
  }, [curve])

  useFrame(({ clock }) => {
    if (!particleRef.current || !active) return
    const t = (clock.getElapsedTime() * 0.15) % 1
    const point = curve.getPointAt(Math.min(t * progress, progress))
    particleRef.current.position.copy(point)
    const scale = 0.08 + Math.sin(clock.getElapsedTime() * 4) * 0.02
    particleRef.current.scale.setScalar(scale)
  })

  return (
    <group>
      {/* Track tube */}
      <mesh ref={tubeRef} geometry={tubeGeometry}>
        <meshBasicMaterial color={color} transparent opacity={active ? 0.15 : 0.05} />
      </mesh>

      {/* Traveling particle */}
      {active && (
        <mesh ref={particleRef}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
        </mesh>
      )}
    </group>
  )
}

export { DEFAULT_POINTS }
export type { PipelineTrackProps }
