import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// Get all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
};

// Search countries by name
export const searchCountries = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}?fullText=false`);
    return response.data;
  } catch (error) {
    console.error("Error searching countries:", error);
    return [];
  }
};

// Filter countries by region
export const filterByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering by region:", error);
    return [];
  }
};

// Get country details by code
export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    console.error("Error getting country by code:", error);
    return null;
  }
};

// Get countries by language
export const getCountriesByLanguage = async (language) => {
  try {
    const response = await axios.get(`${BASE_URL}/lang/${language}`);
    return response.data;
  } catch (error) {
    console.error("Error getting countries by language:", error);
    return [];
  }
};
