import { useEffect, useRef, useState } from "react";
import Metamask from "@metamask/onboarding";

export default function useMetamask() {
  const [isInstalled, setIsInstalled] = useState();
  const onboarding = useRef();

  useEffect(function initialize() {
    onboarding.current = new Metamask();
    setIsInstalled(Metamask.isMetaMaskInstalled());
  }, []);


  return {
    isMetamaskInstalled: isInstalled,
    onboarding: onboarding.current
  };
}
