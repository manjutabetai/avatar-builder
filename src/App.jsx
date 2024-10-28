import { Canvas } from "@react-three/fiber"
import Experience from "./components/Experience"
import Ui from "./components/Ui"

function App() {

  return (
   <>
   <Ui/>
      <Canvas
         camera={{
        position: [-1,1,5,],
        fov:45
      }}
      shadows
      >
        <color attach="background" args={["#555"]}/>

        <fog attach="fog" args={["#555", 15,25]}/>
        <group position-y={-1}>

       <Experience/>
        </group>

      </Canvas>
   </>
  )
}

export default App
