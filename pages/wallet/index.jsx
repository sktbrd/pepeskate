// import react stuff 
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React from 'react';
import { useState, useEffect } from 'react';


// import web3 stuff
import { useAccount } from "wagmi";

import NFTGallery from "../../components/wallet/nft/nftGallery";
import TokensBalanceDisplay from "../../components/wallet/evm/evmBalance";
import HiveBalance from "../../components/wallet/hive/hiveBalance";

// Styles 
import styles from ".//Wallet.module.css";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState(0);
  const { address, isConnected } = useAccount();

  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <center>
        <TabList>
          <Tab style={{background:"limegreen"}}>Tokens</Tab>
          <Tab style={{background:"limegreen"}}>NFTs</Tab>
        </TabList>
        </center>

        <TabPanel >
          <div className={styles.wallet_dashboard}>
            <HiveBalance />
            <TokensBalanceDisplay walletAddress={address} chain={"ETH_MAINNET"} />
          </div>
        </TabPanel>
        <TabPanel>
          <NFTGallery />
        </TabPanel>
      </Tabs>
    </div>
  );
}

