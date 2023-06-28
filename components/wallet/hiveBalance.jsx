import { useState, useEffect } from "react";
import useAuthUser from "../../pages/api/UseAuthUser.js";
import styles from "../../styles/HiveWallet.module.css";
import { FaCoins } from 'react-icons/fa';

export default function HiveBalanceDisplay() {
  const { user } = useAuthUser();
  const [hiveBalance, setHiveBalance] = useState(0);
  const [hbdBalance, setHbdBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setHiveBalance(user.balance);
      setHbdBalance(user.hbd_balance);
      setSavingsBalance(user.savings_hbd_balance)
      setIsLoading(false);
    }
  }, [user]);

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
          <div className={styles.balance_container}>
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
        </>
      )}
    </div>
  );  
}
