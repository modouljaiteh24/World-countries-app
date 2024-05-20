import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [islaoding, setIsloading] = useState(false);

  // const API_URL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    setIsloading(true);
    const FetchCountries = async () => {
      const jsonResponse = await fetch("https://restcountries.com/v3.1/all");
      const response = await jsonResponse.json();
      setIsloading(false);
      setCountries(response);
    };
    FetchCountries();
  }, []);
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <header>
        <div>
          <h1>Where in the world?</h1>

          <div>
            <span className="dark-mode-toggler">Dark Mode</span>
          </div>
        </div>
      </header>
      <main>
        <div className="filters">
          <form action="" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <svg
                style={{ width: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="search-icon"
              >
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                  fill="currentColor"
                />
              </svg>
              <input
                className="search-input"
                type="text"
                placeholder="Search for a country..."
                onChange={handleChange}
                value={search}
              />
            </div>

            <div className="select-wrapper">
              <select className="select-input" name="region" id="region">
                <option value="">Filter by Region</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>
          </form>
        </div>

        <div className="countries">
          {islaoding && <p className="loading">Loading....</p>}
          {filteredCountries.map((country) => (
            <div className="country-card" key={country.name.common}>
              <div className="card-header">
                <img
                  className="flag"
                  src={country.flags.png}
                  alt="The Gambia Flag"
                />
              </div>
              <div className="card-body">
                <h2>{country.name.common}</h2>
                <ul className="country-info">
                  <li className="contry-info-content-wrapper">
                    <strong className="country-info-label">Population:</strong>{" "}
                    <span>{country.population.toLocaleString()}</span>
                  </li>
                  <li className="contry-info-content-wrapper">
                    <strong className="country-info-label">Region:</strong>{" "}
                    <span>{country.region}</span>
                  </li>
                  <li className="contry-info-content-wrapper">
                    <strong className="country-info-label">Capital: </strong>
                    <span>{country.capital ? country.capital[0] : "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
