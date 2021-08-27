import { createContext } from 'react';

export const AppContext = createContext({
  signature: {},
  setSignature: () => {}
})

const AppProvider = ({ children, value }) => (
  <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
);
export default AppProvider;