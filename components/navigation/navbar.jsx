import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Navbar.module.css";
//import SearchBar from "./SearchBar";
import HiveFeed from "../home/HiveFeed";

export default function Navbar() {
  const handleSearch = (tag) => {
    HiveFeed.fetchPosts(tag);
  };

  return (
    <nav className={styles.navbar}>
      <a href="/" target="_blank">
        <img className={styles.logo} src="/pepeskate.gif" alt="Hive Logo" />
      </a>
      {/* <div className={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </div> */}
      <div className={styles.connectbutton}>
        <ConnectButton />
      </div>
    </nav>
  );
}
