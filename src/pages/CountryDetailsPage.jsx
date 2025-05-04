import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../api/countries";
import LoadingSpinner from "../components/LoadingSpinner";
import BackButton from "../components/BackButton";

const CountryDetailsPage = ({ isAuthenticated }) => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/login");
    //   return;
    // }

    const fetchCountryDetails = async () => {
      try {
        const data = await getCountryByCode(countryCode);
        setCountry(data);
      } catch (err) {
        setError("Failed to fetch country details");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode, isAuthenticated, navigate]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!country)
    return <div className="container mx-auto p-4">Country not found</div>;

  return (
    <div className="container mx-auto p-4">
      <BackButton />

      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Flag Image */}
          <div className="md:w-1/2">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Country Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Official Name:</span>{" "}
                  {country.name.official}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital?.join(", ") || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Subregion:</span>{" "}
                  {country.subregion || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Area:</span>{" "}
                  {country.area.toLocaleString()} km²
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Languages:</span>{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Currency:</span>{" "}
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Borders */}
            {country.borders && country.borders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((border) => (
                    <span
                      key={border}
                      className="px-3 py-1 bg-gray-100 rounded-md text-sm"
                    >
                      {border}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map Link */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <a
                href={`https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-5 text-center mt-10">
            Coat of Arms
          </h2>
          <img
            src={country.coatOfArms.png}
            alt={`Coat of Arms of ${country.name.common}`}
            className="w-80 h-auto rounded-lg shadow-md justify-self-center"
          />
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsPage;
