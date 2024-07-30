import { useState, useRef } from 'react'
import './App.css'
import { ToggleSlider }  from "react-toggle-slider"
import { parseData } from "./funcs.js"

let cities = parseData()

function fToC(Temp) {
  return (Temp - 273.15) * (9 / 5) + 32
}

function App() {
    
  const inputRef = useRef()
  const [temperatureF, setTemperatureF] = useState('--')
  const [temperatureC, setTemperatureC] = useState('--')
  const [fCSwitch, setFCSwitch] = useState('True')
  const [city, setCity] = useState('')
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onSearch = (location) => {
    console.log(location)
  }

  const search = async(location) => {
    
    if (!confirm(`Are you sure you want to select: ${location}?`)) {
      return
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_APP_API_KEY}`);
    const data = await response.json();

    if (!response.ok){
      alert("City is not a valid city")
    }

    setTemperatureF(Math.round(fToC(data.main.temp)))
    setTemperatureC((data.main.temp - 273.15).toFixed(1))
    setCity(location)
    setValue('')
  }

  return (
    <>
    <form>
      <input ref={inputRef} value={value} type="text" placeholder="Search..." onChange={onChange}></input>
      <button type="button" onClick={() => search(value)}>Search</button>
    </form>
    <div id="dropdown">
        {cities.filter(item => {
          const searchTerm = value.toLowerCase()
          const city = item.city.toLowerCase()
          return city.startsWith(searchTerm) && searchTerm
        }).slice(0,10).map((item) => <div id="dropdown-row" onClick={()=>search(item.city)}>
          {item.city}</div>)}
    </div>
    <p id="side-note">Enter your city to find relevant weather information. Information on this website will not be saved or sold.</p>
    <div id="card">
      <p><strong>{city}</strong></p>
      <p>{fCSwitch ? <strong>{temperatureF} °F</strong> : <strong>{temperatureC} °C</strong>}</p>
      <div id="switch">
        °F <ToggleSlider onToggle={state => setFCSwitch(!state)}/> °C
      </div>
      <p id="side-note">Click on me to change units!</p>
    </div>
    <div id="modal">
    </div>
    </>
  ) 
}

export default App
