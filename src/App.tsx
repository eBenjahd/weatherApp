import CoordsProvider from "./context/CoordsContext"
import WeatherProvider from "./context/WeatherContext"
import CitySearch from "./components/CitySearch"


function App() {

  return (
    <>
      <CoordsProvider>
        <WeatherProvider>

          <h1>Hola mundo!</h1>
          <CitySearch />
          
        </WeatherProvider>
      </CoordsProvider>
    </>
  )
}

export default App
