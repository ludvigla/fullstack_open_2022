const CountryBasics = ({ country }) => {
    return(
        <>
        <h2>{country.name.common}</h2>
        <ul className="no-bullets">
            <li>capital {country.capital}</li>
            <li>area {country.area}</li>
        </ul>
        <h3>languages</h3>
        <ul>
            {Object.keys(country.languages).map((key, index) => (
            <li key={index}>{country.languages[key]}</li>
            ))}
        </ul>
        <img src={country.flags.png} alt="flag" width="200" />
        </>
    )
};

export default CountryBasics;