import './App.css'
import ArenaWithBull from './components/ArenaWithBull'
import { Matador } from './components/Matador'
import { OldMatador } from './components/OldMatador'

function App() {
  return (
    <div className="App">

      {/* <ArenaWithBull matador={<Matador applause={0} setMatarodPosition={function (nevPosition: number): void {
        throw new Error('Function not implemented.')
      }} matadorPosition={0} />} /> */}

      <ArenaWithBull matador={<OldMatador applause={0} setMatarodPosition={function (nevPosition: number): void {
        throw new Error('Function not implemented.')
      } } matadorPosition={0} />} />

    </div>
  )
}

export default App
