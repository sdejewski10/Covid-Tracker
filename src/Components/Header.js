import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "../CSS/Header.css";

// https://disease.sh/v3/covid-19/countries

function Header() {
  const [countries, setCountries] = useState([]); //Setting variable to loop through with API call to get all countries in the world
  const [country, setCountry] = useState("worldwide"); //Setting default value for drop down box to "WorldWide"
  const [countryInfo, setCountryInfo] = useState({}); //Setting variables for individual countries entire information from API

  useEffect(() => {
    //async -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //going through JSON response and getting the country name
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //Function to store when we click {SELECT} a new country in the drop down.
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    //Make another call to the specific country we select
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log("COUNTRY INFO>>>>", countryInfo);

  return (
    <div className="app__header">
      <h1>COVID TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
