// Simulated user database
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// Check if user is authenticated
export const checkAuth = () => {
  return sessionStorage.getItem("isAuthenticated") === "true";
};

// Get current username
export const getCurrentUser = () => {
  return sessionStorage.getItem("username");
};

// Login function
export const login = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("username", username);
    return true;
  }
  return false;
};

// Logout function
export const logout = () => {
  sessionStorage.removeItem("isAuthenticated");
  sessionStorage.removeItem("username");
};
