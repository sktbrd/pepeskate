// import react stuff 
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import "react-tabs/style/react-tabs.css";

// import web3 stuff
import { useAccount } from "wagmi";

import NFTGallery from "../../components/wallet/nftGallery";
import TokensBalanceDisplay from "../../components/wallet/evmBalance";
import HiveBalance from "../../components/wallet/hiveBalance";

// Styles 
import styles from ".//Wallet.module.css";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState(0);
  const { address, isConnected } = useAccount();

  return (
    <div>
      <center>
      <h2>WALLET</h2>
      </center>
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <center>
        <TabList>
          <Tab>Tokens</Tab>
          <Tab>NFTs</Tab>
        </TabList>
        </center>

        <TabPanel>
          <div className={styles.token_panel_container}>
            <div>
              <TokensBalanceDisplay walletAddress={address} chain={"ETH_MAINNET"} />
            </div>
            <div>
              <HiveBalance />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <NFTGallery />
        </TabPanel>
      </Tabs>
    </div>
  );
}
