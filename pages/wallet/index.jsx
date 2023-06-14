import { useState } from "react";
import NFTGallery from "../../components/wallet/nftGallery";
import TokensBalanceDisplay from "../../components/wallet/tokensBalanceDisplay";
import HiveBalance from "../../components/wallet/hiveBalance";
import styles from "../../styles/Wallet.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAccount } from "wagmi";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState(0);
  const { address, isConnected } = useAccount();

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
          <div className={styles.token_panel_container}>
            <div className={styles.tokens_box}>
              <TokensBalanceDisplay walletAddress={address} chain={"ETH_MAINNET"} />
            </div>
            <div className={styles.balancePanel}>
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
