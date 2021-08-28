import useMetamask from "../../lib/useMetamask";
import DialogWithAction from "../common/DialogWithAction";

export default function InstallMetamask() {
  const { onboarding } = useMetamask();

  function startOnboarding() {
    onboarding.startOnboarding();
  }

  return (
    <DialogWithAction
      open
      title="Please install Metamask"
      content="This site requires MetaMask to work. Please install it and create a wallet if you don't have one."
      onClick={startOnboarding}
      buttonLabel="Install"
    />
  );
}
