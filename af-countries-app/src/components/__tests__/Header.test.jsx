import { render, screen, fireEvent } from "../../test-utils";
import Header from "../Header";

describe("Header", () => {
  test("renders navigation links", () => {
    render(<Header isAuthenticated={false} setIsAuthenticated={jest.fn()} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("shows user info when authenticated", () => {
    render(<Header isAuthenticated={true} setIsAuthenticated={jest.fn()} />);

    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("dark mode toggle works", () => {
    render(<Header isAuthenticated={false} setIsAuthenticated={jest.fn()} />);
    const toggleButton = screen.getByLabelText("Switch to dark mode");

    fireEvent.click(toggleButton);
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
  });
});
