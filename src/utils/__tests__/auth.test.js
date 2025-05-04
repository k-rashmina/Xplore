import { login, logout, checkAuth, getCurrentUser } from "../auth";

describe("Auth Utilities", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("login sets session storage", () => {
    const result = login("user1", "password1");
    expect(result).toBe(true);
    expect(sessionStorage.getItem("isAuthenticated")).toBe("true");
    expect(sessionStorage.getItem("username")).toBe("user1");
  });

  test("login fails with wrong credentials", () => {
    const result = login("wrong", "credentials");
    expect(result).toBe(false);
    expect(sessionStorage.getItem("isAuthenticated")).toBeNull();
  });

  test("logout clears session storage", () => {
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("username", "testuser");

    logout();
    expect(sessionStorage.getItem("isAuthenticated")).toBeNull();
    expect(sessionStorage.getItem("username")).toBeNull();
  });

  test("checkAuth returns authentication status", () => {
    expect(checkAuth()).toBe(false);

    sessionStorage.setItem("isAuthenticated", "true");
    expect(checkAuth()).toBe(true);
  });

  test("getCurrentUser returns username", () => {
    expect(getCurrentUser()).toBeNull();

    sessionStorage.setItem("username", "testuser");
    expect(getCurrentUser()).toBe("testuser");
  });
});
