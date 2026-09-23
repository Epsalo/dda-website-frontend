import React from "react";
import { getStoredUser, login as loginApi, logout as logoutApi, me } from "../api/auth.api";

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(getStoredUser);
  const [loading, setLoading] = React.useState(Boolean(localStorage.getItem("dda_token")));

  React.useEffect(() => {
    if (!localStorage.getItem("dda_token")) { setLoading(false); return; }
    me().then(setUser).catch(() => { logoutApi(); setUser(null); }).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const result = await loginApi(email, password);
    setUser(result.user);
    return result;
  };
  const logout = () => { logoutApi(); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
    {children}
  </AuthContext.Provider>;
}
export const useAuth = () => React.useContext(AuthContext);
