// import react stuff 
import { useState, useEffect } from "react";
import { FaCoins } from 'react-icons/fa';
import Image from 'next/image';
import Modal from './sendHiveModal.jsx'; // Import the Modal component

// import current user
import useAuthUser from "../../../pages/api/UseAuthUser.js";

// import styles 
import styles from "./HiveBalance.module.css";

export default function HiveBalanceDisplay() {
  const { user } = useAuthUser();
  const [hiveBalance, setHiveBalance] = useState(0);
  const [hivePower, setHivePower] = useState(0); // New state variable for Hive Power
  const [hbdBalance, setHbdBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false); // New state variable for the visibility of the modal

  useEffect(() => {
    if (user) {
      setHiveBalance(user.balance);
      setHivePower(user.hive_power); // Set the Hive Power balance
      setHbdBalance(user.hbd_balance);
      setSavingsBalance(user.savings_hbd_balance)
      setIsLoading(false);
    }
  }, [user]);

  const handleTransfer = async () => {
    if (window.hive_keychain && user) {
      // Ensure the amount is a string with 3 decimal places
      const formattedAmount = parseFloat(amount).toFixed(2);

      window.hive_keychain.requestTransfer(user.name, toAddress, formattedAmount, "#Test Keychain SDK transfer(will be encrypted)", "HIVE", response => {
        console.log(response);
      }, false);
    } else {
      console.log("Hive Keychain extension not installed, not enabled, or no user connected.");
    }
  }

  const handleOpenModal = () => {
    setShowModal(true);
  }

  return (
    <div className={styles.hive_box}>
      <div className={styles.header}>Hive Balance</div>
      {isLoading ? (
        <div>Roll a Joint...</div>
      ) : (
        <>
          <div className={styles.hive_avatar_container}>
            <img 
              src={`https://images.hive.blog/u/${user.name}/avatar`}
              alt="profile avatar"
              className={styles.hive_avatar}
            />
            <div className={styles.hive_name}>{user.name}</div>
          </div>
          <div className={styles.hive_balance_container}>
            <div className={styles.hive_token_container} onClick={handleOpenModal}>
              <Image src="/hive_logo.png" alt="Hive Logo" width={30} height={30} className={styles.logo} />
              <div className={styles.token_info}>
                {hiveBalance ? (
                  <div className={styles.token_balance}>
                    <div className={styles.balance}>
                      {hiveBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HIVE</div>
                  </div>
                ) : (
                  <div>No HIVE balance found.</div>
                )}
              </div>
            </div>
            <div className={styles.hive_token_container} onClick={handleOpenModal}>
              <Image src="/hive_logo.png" alt="Hive Power Logo" width={30} height={30} className={styles.logo} />
              <div className={styles.token_info}>
                {hivePower ? (
                  <div className={styles.token_balance}>
                    <div className={styles.balance}>
                      {hivePower.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HP</div>
                  </div>
                ) : (
                  <div className={styles.token_symbol}>HP</div>
                )}
              </div>
            </div>
            <div className={styles.hive_token_container} onClick={handleOpenModal}>
              <Image src="/hive_logo.png" alt="HBD Logo" width={30} height={30} className={styles.logo} />
              <div className={styles.token_info}>
                {hbdBalance ? (
                  <div className={styles.token_balance}>
                    <div className={styles.balance}>
                      {hbdBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HBD</div>
                  </div>
                ) : (
                  <div>No HBD balance found.</div>
                )}
              </div>
            </div>
            <div className={styles.hive_token_container} onClick={handleOpenModal}>
              <Image src="/hive_logo.png" alt="Savings Logo" width={30} height={30} className={styles.logo} />
              <div className={styles.token_info}>
                {savingsBalance ? (
                  <div className={styles.token_balance}>
                    <div className={styles.balance}>
                      {savingsBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HBD Savings</div>
                  </div>
                ) : (
                  <div>No HBD Savings balance found.</div>
                )}
              </div>
            </div>
          </div>
          {showModal && (
            <Modal 
              toAddress={toAddress} 
              setToAddress={setToAddress} 
              amount={amount} 
              setAmount={setAmount} 
              handleTransfer={handleTransfer} 
              setShowModal={setShowModal}
            />
          )}
        </>
      )}
    </div>
  );  
}
