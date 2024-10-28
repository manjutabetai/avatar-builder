import { Environment, OrbitControls } from "@react-three/drei"
import Avatar from "./Avatar"
const Experience = () => {
  return (
    <>
    <OrbitControls/>
    <Environment preset="sunset" environmentIntensity={0.3}/>

    {/* key light */}
    <directionalLight
    position={[5,5,5]}
    intensity={2.2}
    castShadow
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
    shadow-bias={-0.0001}
    />
    {/* Fill Light */}
    <directionalLight position={[-5,5,5]} intensity={0.7}/>
    {/* Back Light */}
    <directionalLight position={[1,0.1,-5]} intensity={3} color={"red"} />
    <Avatar/>
    </>
  )
}

export default Experience