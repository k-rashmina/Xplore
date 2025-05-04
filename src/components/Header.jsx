import { Link } from "react-router-dom";
import { logout, getCurrentUser } from "../utils/auth";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-neutral-200 text-black p-4 shadow-md sticky top-0 z-50 flex">
      <h1 className="text-3xl font-bold mr-20 text-blue-400">Xplorer</h1>
      <div className="container mx-auto">
        <nav>
          <ul className="flex items-center gap-6 list-none">
            <li>
              <Link
                to="/"
                className="text-black no-underline hover:underline font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-black no-underline hover:underline font-medium"
              >
                Countries
              </Link>
            </li>
            <div className="flex-grow"></div>
            {isAuthenticated ? (
              <>
                <li className="text-black font-medium">
                  Welcome, {getCurrentUser()}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary px-4 py-1 rounded hover:bg-gray-100 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-neutral-200 hover:text-white text-primary px-4 py-1 rounded hover:bg-blue-400 transition-colors font-medium no-underline border-2 border-blue-400 text-blue-400"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
