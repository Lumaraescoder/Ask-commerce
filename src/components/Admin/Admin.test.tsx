import { AuthContext, AuthProvider } from "@/auth/auth-context";
import Admin from "@/pages/admin";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Router from "next/router";

describe("Admin page", () => {
  test("renders content if user is authenticated", () => {
    const authState = { token: "example_token" };
    const logout = () => { /* logout logic */ };
    const setAuthState = () => { /* setAuthState logic */ };
    const isUserAuthenticated = () => true;
    const history = createMemoryHistory();
    
    const { getByText } = render(
      <AuthContext.Provider value={{ authState, logout, setAuthState, isUserAuthenticated }}>
        <Router history={history}>
        <AuthProvider>
          <Admin />
        </AuthProvider>
        </Router>
      </AuthContext.Provider>
    );
    expect(getByText("Welcome to the admin page!")).toBeInTheDocument();
  })
});