import { useState, useEffect } from "react";
import useAuthUser from "../../pages/api/UseAuthUser.js";
import styles from "../../styles/HiveBalance.module.css";

export default function HiveBalanceDisplay() {
  const { user } = useAuthUser();
  const [hiveBalance, setHiveBalance] = useState(0);
  const [hbdBalance, setHbdBalance] = useState(0);

  useEffect(() => {
    if (user) {
      setHiveBalance(user.balance);
      setHbdBalance(user.hbd_balance);
    }
  }, [user]);

  return (
    <div className={styles.tokens_box}>
      <div className={styles.header}>Hive Blockchain</div>
      <div className={styles.token_panel_container}>
        <div className={styles.token_container}>
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
                <div>HIVE</div>
              </div>
            ) : (
              <div>Refresh the page, our dev sucks...</div>
            )}
          </div>
        </div>
        <div className={styles.token_container}>
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
                <div>HBD</div>
              </div>
            ) : (
              <div>Refresh the page, our dev sucks...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
