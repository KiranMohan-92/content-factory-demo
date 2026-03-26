import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ConnectionBeamProps {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
  active?: boolean
  pulseSpeed?: number
}

export function ConnectionBeam({ start, end, color = '#ccff00', active = true, pulseSpeed = 2 }: ConnectionBeamProps) {
  const lineRef = useRef<THREE.Line>(null!)

  const lineObj = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })
    return new THREE.Line(geometry, material)
  }, [start, end, color])

  useFrame(({ clock }) => {
    if (!lineRef.current) return
    const mat = lineRef.current.material as THREE.LineBasicMaterial
    mat.opacity = active ? 0.3 + 0.2 * Math.sin(clock.getElapsedTime() * pulseSpeed) : 0.05
  })

  return <primitive ref={lineRef} object={lineObj} />
}
