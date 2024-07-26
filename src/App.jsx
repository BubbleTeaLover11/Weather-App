import { useState, useRef } from 'react'
import './App.css'
import { ToggleSlider }  from "react-toggle-slider"

function fToC(Temp) {
  return (Temp - 273.15) * (9 / 5) + 32
}

function App() {
  
  const inputRef = useRef()
  const [isOpen, setIsOpen] = useState('False')
  const [temperatureF, setTemperatureF] = useState('--')
  const [temperatureC, setTemperatureC] = useState('--')
  const [fCSwitch, setFCSwitch] = useState('True')
  const [city, setCity] = useState('')

  const search = async(location) => {
    
    if (!confirm(`Are you sure you want to select: ${location}?`)) {
      return
    }

    const key = import.meta.env.VITE_APP_API_KEY
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`);
    const data = await response.json();

    if (!response.ok){
      alert("City is not a valid city")
    }

    setTemperatureF(Math.round(fToC(data.main.temp)))
    setTemperatureC((data.main.temp - 273.15).toFixed(1))
    setCity(location)
  }

  return (
    <>
    <form>
      <input ref={inputRef} type="text" placeholder="Search..."></input>
      <button type="button" onClick={() => search(inputRef.current.value)}>Enter</button>
    </form>
    <p id="side-note">Enter your city to find relevant weather information.</p>
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
