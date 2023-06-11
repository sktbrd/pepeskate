import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserController = () => {
  const { user, setUser } = useContext(UserContext);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return {
    user,
    login,
    logout,
    isLoggedIn,
  };
};
