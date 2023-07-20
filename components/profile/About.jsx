// Import react hooks and icons
import { useState, useEffect } from "react";
import { FaCoins } from 'react-icons/fa';

// Import current user
import useAuthUser from "../../pages/api/UseAuthUser.js";

// Import styles 
import styles from "../../styles/About.module.css";

export default function About() {
  // Define state variables
  const { user } = useAuthUser();
  const [hiveBalance, setHiveBalance] = useState(0);
  const [hbdBalance, setHbdBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [profileAbout, setProfileAbout] = useState('');

  // Fetch user data when the component mounts
  useEffect(() => {
    if (user) {
      // Set the user's balances
      setHiveBalance(user.balance);
      setHbdBalance(user.hbd_balance);
      setSavingsBalance(user.savings_hbd_balance);

      // Set loading state to false
      setIsLoading(false);

      // Parse the user's metadata and set the profile about
      const metadata = JSON.parse(user.posting_json_metadata);
      if (metadata && metadata.profile && metadata.profile.about) {
        setProfileAbout(metadata.profile.about);
      }
    }
  }, [user]);

  // Define a helper component for displaying profile items
  const ProfileItem = ({ label, value }) => (
    <tr>
      <td>{label}:</td>
      <td>{value}</td>
    </tr>
  );

  // Render the component
  return (
    <div className="about">
      <div className={styles.tokens_box}>
      {isLoading ? (
        console.log("Refresh Page")
      ) : (
        <div className={styles.container}>
          <div>
            <div>
              <h3 style={{color:"white"}}>Voting Power: add support to HP here </h3>
              <br/>
            </div>
            <table className={styles.table}>
              <tbody>
                <ProfileItem label="Posting Key" value={user.posting.key_auths[0]} />
                <ProfileItem label="Name" value={user.name} />
                <ProfileItem label="About" value={profileAbout} />
              </tbody>
            </table>
          </div>
          <div className={styles.hivebalance_container}>
            <div className={styles.token_container}>
              <div className={styles.token_info}>
                <div className={styles.token_balance}>
                  <div className={styles.price}>
                    {hiveBalance.split(" ")[0]}
                  </div>
                  <div className={styles.token_symbol}>HIVE</div>
                </div>
              </div>
            </div>
            <div className={styles.token_container}>
              <div className={styles.image_container}>
                <FaCoins />
              </div>
              <div className={styles.token_info}>
                <div className={styles.token_balance}>
                  <div className={styles.price}>
                    {hbdBalance.split(" ")[0]}
                  </div>
                  <div className={styles.token_symbol}>HBD</div>
                </div>
              </div>
            </div>
            <div className={styles.token_container}>
              <div className={styles.token_info}>
                <div className={styles.token_balance}>
                  <div className={styles.price}>
                    {savingsBalance.split(" ")[0]}
                  </div>
                  <div className={styles.token_symbol}>HBD Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

  );  
}
