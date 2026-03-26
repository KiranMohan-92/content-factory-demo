import { Grid } from '@react-three/drei'

export function GridFloor() {
  return (
    <Grid
      position={[0, -2, 0]}
      args={[30, 30]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#1a1a1a"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#2e2e2e"
      fadeDistance={20}
      fadeStrength={1}
      infiniteGrid
    />
  )
}
