import { useState, useRef, useEffect } from 'react'
import './App.css'
import { ToggleSlider }  from "react-toggle-slider"
import { parseData, getAQI, getHumid, getPressure, getQuote } from "./funcs.js"

let cities = parseData()
const apiKey = import.meta.env.VITE_APP_API_KEY

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
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [aqi, setAqi] = useState('--')
  const [particle, setParticle] = useState('')
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [windMPH, setWindMPH] = useState('--')
  const [windKPH, setWindKPH] = useState('--')
  const [mmHg, setmmHg] = useState('--')
  const [torr, setTorr] = useState('--')
  const [pressSwitch, setPressSwitch] = useState('True')
  const [speedSwitch, setSpeedSwitch] = useState('True')
  const [httpReq, sethttpReq] = useState(true)
  const [humidity, setHumidity] = useState('--')

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const search = async(location) => {
    
    if (!confirm(`Are you sure you want to select: ${location}?`)) {
      return
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();

    if (!response.ok){
      alert("City is not a valid city")
    }

    setTemperatureF(Math.round(fToC(data.main.temp)))
    setTemperatureC((data.main.temp - 273.15).toFixed(1))
    setCity(location)
    setValue('')
    setLat(data.coord.lat)
    setLon(data.coord.lon) 

    getQuote().then(data => {
      setQuote(data['quote'])
      setAuthor(data['author'])})
    
    sethttpReq(false)
  }

 
  if (lat && lon && !httpReq){
    getAQI(lat, lon, apiKey).then(data => {setAqi(data['aqi'])
      setParticle(data['components'])
    })
    getHumid(lat, lon, apiKey).then(data => {
      setHumidity(data['humidity'])
      setWindKPH(data['windSpeedKMH'])
      setWindMPH(data['windSpeedMPH'])
    })
    getPressure(lat, lon, apiKey).then(data => {
      setmmHg(data['mmHgPressure'])
      setTorr(data['torrPressure'])
    })
    sethttpReq(true)
  }

  return (
    <>
    <p>"<emphasis>{quote}</emphasis>" -{author}</p>
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
        <ToggleSlider onToggle={state => setFCSwitch(!state)}/>
      </div>
      <p id="side-note">Click on me to change units!</p>
    </div>
    <div id="card">
      <p><strong>AQI</strong></p>
      <p>{aqi}</p>
      <table>
      <tr>
        <th>Component</th>
        <th>μg/m3</th>
      </tr>
        {Object.keys(particle).map(key =>
        <tr>
          <td>{key}</td>
          <td>{particle[key]}</td>
        </tr>
        )}
      </table>
      <p id="side-note">OpenWeather's AQI is from 1-5 where 1 is good air quality and 5 is bad air quality</p>
    </div>
    <div id="card">
      <p><strong>Humidity</strong></p>
      <p>{humidity}</p>
      <p><strong>Wind Speed</strong></p>
      <p>{speedSwitch ? <strong>{windMPH} mi/h </strong> : <strong>{windKPH} km/h</strong>}</p>
      <div id="switch">
      <ToggleSlider onToggle={state => setSpeedSwitch(!state)}/>
      </div>
      <p id="side-note">Click on me to change units!</p>
      <p><strong>Air Pressure</strong></p>
      <p>{pressSwitch ? <strong>{torr} torr</strong> : <strong>{mmHg} mmHg</strong>}</p>
      <div id="switch">
      <ToggleSlider onToggle={state => setPressSwitch(!state)}/>
      </div>
      <p id="side-note">Click on me to change units!</p>
    </div>
    </>
  ) 
};

export default App;
