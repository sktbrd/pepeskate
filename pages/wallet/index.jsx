import { useState } from "react";
import NFTGallery from "../../components/wallet/nftGallery";
import TokensBalancePanel from "../../components/wallet/tokensBalanceDisplay";
import HiveBalanceDisplay from "../../components/wallet/hiveBalance";
import styles from "../../styles/NftGallery.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function nftWallet() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h2>WALLET</h2>
      <br />
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>Tokens</Tab>
          <Tab>NFTs</Tab>
        </TabList>
        <TabPanel>
          <TokensBalancePanel walletAddress={"sktbrd.eth"} chain={"ETH_MAINNET"} />
          <div className={styles.balancePanel}>
            <HiveBalanceDisplay />
          </div>
        </TabPanel>
        <TabPanel>
          <NFTGallery />
        </TabPanel>
      </Tabs>
    </div>
  );
}
