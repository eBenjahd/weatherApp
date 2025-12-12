import CoordsProvider from "./context/CoordsContext"
import WeatherProvider from "./context/WeatherContext"
import MetricProvider from "./context/MetricsContext"
import CitySearch from "./components/CitySearch"
import Nav from "./components/Nav"

function App() {

  return (
    <>
      <CoordsProvider>
        <WeatherProvider>
          <MetricProvider>
            <Nav />
            <CitySearch />
          </MetricProvider>
        </WeatherProvider>
      </CoordsProvider>
    </>
  )
}

export default App
