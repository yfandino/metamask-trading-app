import { useState } from "react";
import AppProvider from "./lib/appContext";
import Auth from "./components/Auth";
import TradingView from "./components/TradingView";

function App() {
  const [signature, setSignature] = useState();

  return (
    <AppProvider value={{ signature, setSignature }}>
      {signature ? <TradingView /> : <Auth />}
    </AppProvider>
  );
}

export default App;
