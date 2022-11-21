import { useState } from 'react';
import axios from 'axios';
import SearchField from './components/SearchField';
import CountryBasics from './components/CountryBasics';
import ListCountries from './components/ListCountries';
import "./App.css";

const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get('https://restcountries.com/v3.1/name/' + search)
      .then(response => {
        setCountries(response.data);
      })
  };

  return (
    <>
      <SearchField
        search={search}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <CountryBasics country={countries[0]} />
      ) : (
        <ListCountries countries={countries} />
      )}
    </>
  );
};

export default App;
