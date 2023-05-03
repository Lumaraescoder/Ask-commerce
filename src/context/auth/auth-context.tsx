import React, { createContext, useState } from "react";

type AuthState = {
  token: string;
}

export type AuthContextType = {
  authState: AuthState;
  logout: () => void;
  setAuthState: (authState: AuthState) => void;
  isUserAuthenticated: () => boolean; 
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
}
const { Provider } = AuthContext;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: typeof window !== "undefined" ? localStorage.getItem('token') || '' : '',
   });

 const isUserAuthenticated = () => !!authState.token;

 const logout = () => {
  localStorage.removeItem("token");
  setAuthState({token: ""});
 }

 const AuthContextValues: AuthContextType = {
  authState,
  logout,
  setAuthState,
  isUserAuthenticated
 }
 return (
   <Provider
     value={AuthContextValues}
   >
    {children}

   </Provider>
 );
};

export { AuthContext, AuthProvider };