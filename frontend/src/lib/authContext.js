import { createContext } from 'react';

export const AuthContext = createContext({
  accounts: {},
  setAccounts: () => {}
})

const AuthProvider = ({ children, value }) => (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
export default AuthProvider;