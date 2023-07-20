// import react stuff 

import { useState, useEffect } from "react";
import { FaCoins } from 'react-icons/fa';

// import current user

import useAuthUser from "../../pages/api/UseAuthUser.js";

// import styles 

import styles from "../../pages/wallet/HiveBalance.module.css";


export default function HiveBalanceDisplay() {
  const { user } = useAuthUser();
  const [hiveBalance, setHiveBalance] = useState(0);
  const [hbdBalance, setHbdBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (user) {
      setHiveBalance(user.balance);
      setHbdBalance(user.hbd_balance);
      setSavingsBalance(user.savings_hbd_balance)
      setIsLoading(false);
    }
  }, [user]);

  const handleTransfer = async () => {
    if (window.hive_keychain && user) {
      // Ensure the amount is a string with 3 decimal places
      const formattedAmount = parseFloat(amount).toFixed(3);

      window.hive_keychain.requestTransfer(user.name, toAddress, formattedAmount, "#Test Keychain SDK transfer(will be encrypted)", "HIVE", response => {
        console.log(response);
      }, false);
    } else {
      console.log("Hive Keychain extension not installed, not enabled, or no user connected.");
    }
  }

  return (
    <div className={styles.tokens_box}>
      <div className={styles.header}>Hive Balance</div>
      {isLoading ? (
        <div>Roll a Joint...</div>
      ) : (
        <>
          <div className={styles.avatar_container}>
            <img 
              src={`https://images.hive.blog/u/${user.name}/avatar`}
              alt="profile avatar"
              className={styles.avatar}
            />
            <div className={styles.name}>{user.name}</div>
          </div>
          <div className={styles.hivebalance_container}>
            <div className={styles.token_container}>
              <div className={styles.token_info}>
                {hiveBalance ? (
                  <div className={styles.token_balance}>
                    <div className={styles.price}>
                      {hiveBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HIVE</div>
                  </div>
                ) : (
                  <div>No HIVE balance found.</div>
                )}
              </div>
            </div>
            <div className={styles.token_container}>
              <div className={styles.image_container}>
                <FaCoins />
              </div>
              <div className={styles.token_info}>
                {hbdBalance ? (
                  <div className={styles.token_balance}>
                    <div className={styles.price}>
                      {hbdBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HBD</div>
                  </div>
                ) : (
                  <div>No HBD balance found.</div>
                )}
              </div>
            </div>
            <div className={styles.token_container}>
              <div className={styles.token_info}>
                {savingsBalance ? (
                  <div className={styles.token_balance}>
                    <div className={styles.price}>
                      {savingsBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HBD Savings</div>
                  </div>
                ) : (
                  <div>No HBD balance found.</div>
                )}
              </div>
            </div>
          </div>
          <input type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} placeholder="To Address" />
          <br></br>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
          <button onClick={handleTransfer}>Send Hive</button>
        </>
      )}
    </div>
  );  
}
