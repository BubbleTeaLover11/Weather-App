import { useState, useRef } from 'react'
import './App.css'
import { IoIosSearch } from "react-icons/io";
import { BiSolidNavigation } from "react-icons/bi";
import Clock from 'react-clock';

function fToC(Temp) {
  return (Temp - 273.15) * (9 / 5) + 32
}

function App() {
  
  const inputRef = useRef()
  const [temperatureF, setTemperatureF] = useState('--')
  const [temperatureC, setTemperatureC] = useState('--')
  const [city, setCity] = useState('')

  const search = async(location) => {

    const key = import.meta.env.VITE_APP_API_KEY
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`);
    const data = await response.json();

    if (!response.ok){
      alert("Enter Valid City")
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
        <div id="card">
          <p>
            <strong>{city}</strong>
          </p>
          <p>
            <strong>{temperatureF} °F</strong>
          </p>
        </div>
      </>
    ) 
}

export default App


