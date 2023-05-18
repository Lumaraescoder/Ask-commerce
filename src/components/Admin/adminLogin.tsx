import { AuthContext, AuthProvider } from "@/context/auth/auth-context";
import router from "next/router";
import React, { useContext } from "react";

const Admin = () => {
  const { isUserAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isUserAuthenticated()) {
    router.push("/login");
  }

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const AdminPageWithAuth = () => (
  <AuthProvider>
    <Admin />
  </AuthProvider>
);

export default AdminPageWithAuth;
