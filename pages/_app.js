import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Analytics } from '@vercel/analytics/react';  

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
} from "wagmi/chains";
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
  appName: "SkateHive",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
	console.log(sessionStorage.getItem("user"));
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        <MainLayout loggedIn={loggedIn}>
          <Component {...pageProps} />
          <Analytics />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

const dhive = require("@hiveio/dhive");

function getDhive() {
  return { dhive };
}

export { WagmiConfig, RainbowKitProvider, getDhive }; //maybe I have to export dhive
export default MyApp;
