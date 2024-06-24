import "./styles/stylesheet.css"
import { registerCharts } from "./registerCharts"
import ScatterChart from "./components/Scatterplot"

registerCharts()

function App() {
  return (
    <div className="container">
      <h1>React Sinograph for a Radon 2-D transform</h1>
      <div className="graph-container">
        <ScatterChart />
      </div>
    </div>
  )
}

export default App