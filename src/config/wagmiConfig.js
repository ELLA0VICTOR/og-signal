import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { baseSepolia } from "./chains";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
});