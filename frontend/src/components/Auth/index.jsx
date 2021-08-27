import { useState } from "react";
import useMetamask from "../../lib/useMetamask";
import AuthProvider from "../../lib/authContext";
import InstallMetamask from "./InstallMetamask";
import ConnectMetamask from "./ConnectMetamask";

export default function Auth() {
  const { isMetamaskInstalled } = useMetamask();
  const [accounts, setAccounts] = useState();

  if (!isMetamaskInstalled) return <InstallMetamask />;

  return (
    <AuthProvider value={{ accounts, setAccounts }}>
      <ConnectMetamask />
    </AuthProvider>
  );
}
