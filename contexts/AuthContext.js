import React from 'react';

const AuthContext = React.createContext({
  user: null,
  loginWithHive: () => {},
  logout: () => {},
  isLoggedIn: () => {},
});

export default AuthContext;

// not using yet 