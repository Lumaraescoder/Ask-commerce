import { AuthContext, AuthProvider } from "@/auth/auth-context";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

const Admin = () => {
  const { isUserAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // useEffect(() => {
  //   if (!isUserAuthenticated()) {
  //     router.push("/login");
  //   }
  // }, [isUserAuthenticated, router]);

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