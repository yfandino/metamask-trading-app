import { createContext } from 'react';

export const AppContext = createContext({
  signature: {},
  setSignature: () => {},
  account: {},
  setAccount: () => {}
})

const AppProvider = ({ children, value }) => (
  <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
);
export default AppProvider;