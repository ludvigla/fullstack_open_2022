const ListCountries = ({ countries }) => 
  <>
    <ul className="no-bullets">
      {countries.map((country, index) => (
        <li key={index}>{country.name.common}</li>
      ))}
    </ul>
  </>

export default ListCountries;