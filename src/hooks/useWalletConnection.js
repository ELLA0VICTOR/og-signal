import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { baseSepolia } from "../config/chains";

export function useWalletConnection() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, error: connectError, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const isCorrectNetwork = chainId === baseSepolia.id;

  const handleConnect = () => {
    if (!window.ethereum) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    connect({ connector: injected() });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleSwitchNetwork = () => {
    switchChain({ chainId: baseSepolia.id });
  };

  // Parse connect error into user-friendly message
  let errorMessage = null;
  if (connectError) {
    if (connectError.message?.includes("not installed")) {
      errorMessage = "Please install MetaMask to continue";
    } else if (connectError.message?.includes("rejected")) {
      errorMessage = "Connection rejected. Please try again.";
    } else {
      errorMessage = connectError.message || "Connection failed";
    }
  }

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isPending,
    isSwitching,
    isCorrectNetwork,
    chainId,
    errorMessage,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
  };
}