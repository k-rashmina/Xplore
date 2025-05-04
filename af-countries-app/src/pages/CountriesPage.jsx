import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCountries,
  searchCountries,
  filterByRegion,
  getCountriesByLanguage,
} from "../api/countries";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import LoadingSpinner from "../components/LoadingSpinner";

const CountriesPage = ({ isAuthenticated }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/login");
    //   return;
    // }

    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [isAuthenticated, navigate]);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const data = await searchCountries(searchTerm);
      setCountries(data);
    } catch (err) {
      setError("No countries found with that name");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (type, value) => {
    if (!value) {
      // Reset to all countries if no filter value
      const data = await getAllCountries();
      setCountries(data);
      return;
    }

    setLoading(true);
    try {
      let data;
      if (type === "region") {
        data = await filterByRegion(value);
      } else if (type === "language") {
        data = await getCountriesByLanguage(value);
      }
      setCountries(data);
    } catch (err) {
      setError(`Failed to filter by ${type}`);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-center">
        <SearchBar onSearch={handleSearch} />
        <Filters onFilter={handleFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;
