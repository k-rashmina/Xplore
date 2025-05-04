import { render, screen } from "../../test-utils";
import CountryCard from "../CountryCard";

const mockCountry = {
  cca3: "test",
  name: {
    common: "Test Country",
    official: "Official Test Country",
  },
  flags: {
    png: "https://flagcdn.com/test.png",
  },
  capital: ["Test Capital"],
  population: 1000000,
  region: "Test Region",
};

describe("CountryCard", () => {
  test("renders country information", () => {
    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText("Test Country")).toBeInTheDocument();
    expect(screen.getByText("Capital: Test Capital")).toBeInTheDocument();
    expect(screen.getByText("Population: 1,000,000")).toBeInTheDocument();
    expect(screen.getByText("Region: Test Region")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockCountry.flags.png
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/countries/test");
  });
});
