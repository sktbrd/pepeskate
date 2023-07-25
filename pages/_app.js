import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Analytics } from '@vercel/analytics/react';  


import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useAccount, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
} from "wagmi/chains";

import { UserProvider } from "../controllers/UserContext";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import { useEffect, useState } from "react";

const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    polygon,
    optimism,
    arbitrum,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "PepeSkate",
  chains,
  projectId: '52f3a9b032f5caf26719af6939715629',
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,

});

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { address, isConnected } = useAccount();
  console.log(address)



  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        <MainLayout loggedIn={loggedIn}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
          <Analytics />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}



export { WagmiConfig, RainbowKitProvider}; //maybe I have to export dhive
export default MyApp;
