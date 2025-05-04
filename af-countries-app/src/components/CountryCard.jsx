import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link to={`/countries/${country.cca3}`}>
      <div className="bg-white rounded-md overflow-hidden shadow-md transition-transform hover:-translate-y-1">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{country.name.common}</h3>
          <p className="text-sm mb-1">
            Capital: {country.capital?.[0] || "N/A"}
          </p>
          <p className="text-sm mb-1">
            Population: {country.population.toLocaleString()}
          </p>
          <p className="text-sm mb-2">Region: {country.region}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
