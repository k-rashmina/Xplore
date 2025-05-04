import axios from "axios";
import {
  getAllCountries,
  searchCountries,
  filterByRegion,
  getCountryByCode,
  getCountriesByLanguage,
} from "../countries";

jest.mock("axios");

describe("Countries API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllCountries fetches data successfully", async () => {
    const mockData = [{ name: { common: "Test Country" } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getAllCountries();
    expect(axios.get).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/all"
    );
    expect(result).toEqual(mockData);
  });

  test("searchCountries handles error", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));
    const result = await searchCountries("test");
    expect(result).toEqual([]);
  });

  test("filterByRegion returns correct data", async () => {
    const mockData = [{ name: { common: "Europe Country" } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await filterByRegion("europe");
    expect(axios.get).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/region/europe"
    );
    expect(result).toEqual(mockData);
  });

  test("getCountryByCode returns single country", async () => {
    const mockData = [{ name: { common: "Single Country" } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getCountryByCode("test");
    expect(axios.get).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/alpha/test"
    );
    expect(result).toEqual(mockData[0]);
  });

  test("getCountriesByLanguage returns filtered countries", async () => {
    const mockData = [{ name: { common: "English Country" } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getCountriesByLanguage("en");
    expect(axios.get).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/lang/en"
    );
    expect(result).toEqual(mockData);
  });
});
