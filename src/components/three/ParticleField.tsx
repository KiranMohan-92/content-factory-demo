import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  color?: string
  spread?: number
}

export function ParticleField({ count = 150, color = '#ccff00', spread = 15 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)

  const particles = useMemo(() => {
    const temp = []
    let seed = 123456789
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      return seed / 4294967296
    }
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (random() - 0.5) * spread,
          (random() - 0.5) * spread,
          (random() - 0.5) * spread
        ),
        speed: 0.002 + random() * 0.005,
        offset: random() * Math.PI * 2,
        scale: 0.02 + random() * 0.03,
      })
    }
    return temp
  }, [count, spread])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.position.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.3,
        p.position.z + Math.sin(t * p.speed * 0.5 + p.offset) * 0.4
      )
      dummy.scale.setScalar(p.scale * (0.8 + 0.2 * Math.sin(t + p.offset)))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </instancedMesh>
  )
}
