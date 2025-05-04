import { render, screen, waitFor, fireEvent } from "../../test-utils";
import CountriesPage from "../CountriesPage";
import { getAllCountries, searchCountries } from "../../api/countries";

jest.mock("../../api/countries");

const mockCountries = [
  {
    cca3: "1",
    name: { common: "Country 1" },
    flags: { png: "flag1.png" },
    capital: ["Capital 1"],
    population: 1000000,
    region: "Region 1",
  },
  {
    cca3: "2",
    name: { common: "Country 2" },
    flags: { png: "flag2.png" },
    capital: ["Capital 2"],
    population: 2000000,
    region: "Region 2",
  },
];

describe("CountriesPage", () => {
  beforeEach(() => {
    getAllCountries.mockResolvedValue(mockCountries);
  });

  test("renders countries list", async () => {
    render(<CountriesPage isAuthenticated={true} />);

    await waitFor(() => {
      expect(screen.getByText("Countries Explorer")).toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(2);
      expect(screen.getByText("Country 1")).toBeInTheDocument();
      expect(screen.getByText("Country 2")).toBeInTheDocument();
    });
  });

  test("handles search", async () => {
    searchCountries.mockResolvedValue([mockCountries[0]]);
    render(<CountriesPage isAuthenticated={true} />);

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "Country 1" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchCountries).toHaveBeenCalledWith("Country 1");
      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(screen.getByText("Country 1")).toBeInTheDocument();
      expect(screen.queryByText("Country 2")).not.toBeInTheDocument();
    });
  });

  test("redirects if not authenticated", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(<CountriesPage isAuthenticated={false} />);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
