import { useState, useEffect } from "react";
import useAuthUser from "../../pages/api/UseAuthUser.js";
import styles from "../../styles/HiveBalance.module.css";

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
          <ul className={styles.token_panel_container}>
            <li className={styles.token_container}>
              <div className={styles.image_container}>
                <img
                  src="https://cryptologos.cc/logos/hive-blockchain-hive-logo.png"
                  alt="hive"
                />
              </div>
              <div className={styles.token_name_sybol_container}>
                {hiveBalance ? (
                  <div className={styles.token_info}>
                    <div className={styles.price}>
                      {hiveBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HIVE</div>
                  </div>
                ) : (
                  <div>No HIVE balance found.</div>
                )}
              </div>
            </li>
            <li className={styles.token_container}>
              <div className={styles.image_container}>
                <img
                  src="https://i.ibb.co/6b4zHcW/image-removebg-preview.png"
                  alt="hbd"
                />
              </div>
              <div className={styles.token_container}>
                {hbdBalance ? (
                  <div className={styles.token_info}>
                    <div className={styles.price}>
                      {hbdBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HBD</div>
                  </div>
                ) : (
                  <div>No HBD balance found.</div>
                )}
              </div>
            </li>
            <li className={styles.token_container}>
              <div className={styles.image_container}>
                <img
                  src="https://i.ibb.co/6b4zHcW/image-removebg-preview.png"
                  alt="hbd"
                />
              </div>
              <div className={styles.token_container}>
                {savingsBalance ? (
                  <div className={styles.token_info}>
                    <div className={styles.price}>
                      {savingsBalance.split(" ")[0]}
                    </div>
                    <div className={styles.token_symbol}>HBD Savings</div>
                  </div>
                ) : (
                  <div>No HBD balance found.</div>
                )}
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );  
}
