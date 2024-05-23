import { useEffect, useState } from "react";
import axios from "axios";

const CountriesList = ({ filteredCountries, handleShowCountry }) => {
  return (
    <>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country.name.common)}>
            show
          </button>
        </div>
      ))}
    </>
  );
};

const Country = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState(null);
  const [geodata, setGeodata] = useState(null);

  const weatherApiKey = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    if (country) {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]},${country.cca2}&limit=1&appid=${weatherApiKey}`
        )
        .then((response) => {
          setGeodata(response.data[0]);
        });
    }
  }, []);

  useEffect(() => {
    if (geodata) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geodata.lat}&lon=${geodata.lon}&units=metric&appid=${weatherApiKey}`
        )
        .then((response) => {
          setCountryWeather(response.data);
        });
    }
  }, [geodata]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>
      <h2>languages:</h2>
      <div>
        <ul>
          {Object.keys(country.languages).map((language) => (
            <li key={language}>{country.languages[language]}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
      {countryWeather && (
        <>
          <h2>weather in {country.capital[0]}</h2>
          <p>temperature {countryWeather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
            alt={countryWeather.weather[0].description}
          />
          <p>wind {countryWeather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (filter !== "") {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter, countries]);

  const handleSetFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const handleShowCountry = (country) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLowerCase()}`
      )
      .then((response) => {
        setFilter("");
        setCountry(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      find countries
      <input value={filter} onChange={handleSetFilter} />
      {filter !== "" && filteredCountries.length <= 10 ? (
        <div>
          {filteredCountries.length === 1 ? (
            <Country country={filteredCountries[0]} />
          ) : (
            <CountriesList
              filteredCountries={filteredCountries}
              handleShowCountry={handleShowCountry}
            />
          )}
        </div>
      ) : (
        <>
          {filter === "" && country ? (
            <Country country={country} />
          ) : (
            <p>too many matches, specify another filter</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
