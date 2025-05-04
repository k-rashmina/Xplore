import { render, screen, fireEvent, waitFor } from "../test-utils";
import App from "../App";

jest.mock("../api/countries", () => ({
  getAllCountries: jest.fn().mockResolvedValue([
    {
      cca3: "1",
      name: { common: "Test Country" },
      flags: { png: "flag.png" },
      capital: ["Test Capital"],
      population: 1000000,
      region: "Test Region",
    },
  ]),
}));

describe("App Integration", () => {
  test("full navigation flow", async () => {
    render(<App />);

    // Home page
    expect(
      screen.getByText("Welcome to the Countries Explorer")
    ).toBeInTheDocument();

    // Navigate to login
    fireEvent.click(screen.getByText("Login"));
    expect(
      screen.getByText("Login", { selector: "button" })
    ).toBeInTheDocument();

    // Successful login
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "user1" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByText("Login", { selector: "button" }));

    // Should be on countries page after login
    await waitFor(() => {
      expect(screen.getByText("Countries Explorer")).toBeInTheDocument();
      expect(screen.getByText("Test Country")).toBeInTheDocument();
    });

    // Toggle dark mode
    fireEvent.click(screen.getByLabelText("Switch to dark mode"));
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();

    // Logout
    fireEvent.click(screen.getByText("Logout"));
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
