import { useEffect, useRef, useState } from "react";
import Metamask from "@metamask/onboarding";
import Web3 from "web3";

export default function useMetamask() {
  const [isInstalled, setIsInstalled] = useState();
  const onboarding = useRef();
  const web3 = useRef();

  useEffect(function initialize() {
    onboarding.current = new Metamask();
    setIsInstalled(Metamask.isMetaMaskInstalled());
  }, []);

  useEffect(function initializeWeb3() {
    if (!isInstalled) return;
    web3.current = new Web3(window.ethereum);
  }, [isInstalled]);

  return {
    isMetamaskInstalled: isInstalled,
    onboarding: onboarding.current,
    web3: web3.current
  };
}
