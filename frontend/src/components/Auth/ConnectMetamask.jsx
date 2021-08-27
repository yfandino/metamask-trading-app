import { useContext, useState } from "react";
import { AuthContext } from "../../lib/authContext";
import DialogWithAction from "../common/DialogWithAction";

export default function ConnectMetamask() {
  const { setAccounts } = useContext(AuthContext);
  const [label, setLabel] = useState('Connect');
  const [error, setError] = useState();

  async function connect() {
    try {
      setLabel('Connecting...');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <DialogWithAction
      open
      title="Connect to your MetaMask account"
      content="This site requires MetaMask to work. Please connect your wallet."
      onClick={connect}
      buttonDisabled={label === 'Connecting...'}
      buttonLabel={label}
      errorMessage={error}
    />
  );
}
