import { useState, useEffect } from "react";
import styles from "../../pages/wallet/EvmBalance.module.css";

// Define TokensBalancePanel component
export default function TokensBalancePanel({ walletAddress, chain }) {
  // Define state variables using the useState hook
  const [tokensBalance, setTokensBalance] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [address, setAddress] = useState();
  // Define function to get token balances
  const getBalance = async () => {
    setIsloading(true);
    if (walletAddress) {
      try {
        const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
          method: "POST",
          body: JSON.stringify({
            address: address,
            chain: chain ? chain : "ETH_MAINNET",
          }),
        }).then((res) => res.json());
        setTokensBalance(fetchedTokensBalance);
      } catch (e) {
        console.log(e);
      }
    }
    setIsloading(false);
  };

  // Hydration error guard
  useEffect(() => {
    if (walletAddress) setAddress(walletAddress);
  }, [walletAddress]);

  // Fetch token balances when page loads
  useEffect(() => {
    if (address) getBalance();
  }, [address]);

  // Render TokensBalancePanel component
  return (
    <div className={styles.token_box}>
        {address ? (
          <div className={styles.header}>
          EVM Balance of <span style={{color: 'orange'}}>{address}</span>
        </div>
        
        ) : (
          ""
        )}
  
        {isLoading
          ? "Roll a joint..."
          : tokensBalance?.length &&
            tokensBalance?.map((token, i) => {
              return (
                <div key={i} className={styles.token_container}>
                  <div className={styles.logo_and_name_container}>
                    {token.logo ? (
                      <div className={styles.image_container}>
                        <img src={token.logo} alt={"logo"}></img>
                      </div>
                    ) : (
                      <div className={styles.image_container}>
                        <img src="https://images.ecency.com/u/hive-173115/avatar/lardge" alt="logo" />
                      </div>
                    )}
                    <div className={styles.coin_name}>
                      {token.name}
                    </div>
                  </div>
                  <div className={styles.token_info}>
                    <div className={styles.balance}>{token.balance}</div>
                    <div className={styles.coin_symbol}>{token.symbol}</div>
                  </div>
                </div>
              );
            })}
    </div>
  );
}
