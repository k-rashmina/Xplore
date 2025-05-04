import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountriesPage from "./pages/CountriesPage";
import LoginPage from "./pages/LoginPage";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import { checkAuth } from "./utils/auth";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main className="flex-grow p-4 md:p-8 ">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/"
            element={<CountriesPage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/countries/:countryCode"
            element={<CountryDetailsPage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
