import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState(null)

  // Fetch all countries data once on initial load
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm) {
      const matches = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCountries(matches)
    } else {
      setFilteredCountries([])
    }
  }, [searchTerm, countries])

  // Fetch weather data when there is exactly one filtered country
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      const capital = country.capital
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.error('Error fetching weather data:', error))
    } else {
      setWeather(null)
    }
  }, [filteredCountries])

  // Event handler for search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Render logic based on filtered countries count
  const renderCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map(country => (
            <div key={country.cca3}>
              {country.name.common} 
              <button onClick={() => setFilteredCountries([country])}>show</button>
            </div>
          ))}
        </div>
      )
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

          {weather && (
            <div>
              <h3>Weather in {country.capital}</h3>
              <p>temperature: {weather.main.temp} Celsius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                  alt={weather.weather[0].description} />
              <p>wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )
    } else {
      return <p>No matches found</p>
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '100vh' }}>
      <p>
        find countries <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </p>
      {renderCountries()}
    </div>
  )
}

export default App
