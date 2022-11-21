import { useState, useEffect } from 'react';
import CountryBasics from "./CountryBasics";

const ListCountries = ({ countries }) => {

    const [ showCountry, setShowCountry ] = useState([]);

    useEffect(() => {
        setShowCountry(countries);
    }, [countries]);

  return (
    <>
        <ul className="no-bullets">
        {showCountry.map((country, index) => (
            <li key={index}>
                {country.name.common}
                <input key={index} type="button" value="show" onClick={() => {
                    const copy = [...showCountry];
                    copy[index].show = !copy[index].show;
                    setShowCountry(copy);
                }}/>
                {country.show ? <CountryBasics country={country} /> : null}
            </li>
        ))}
        </ul>
    </>
  )
};

export default ListCountries;