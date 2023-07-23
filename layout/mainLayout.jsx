import Navbar from "../components/navigation/navbar";
import Menu from "../components/navigation/menu"; // Note the lowercase 'menu' here
import { useState } from "react";
import styles from './mainLayout.module.css'; // Import the CSS module

export default function Layout({ children }) {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <div className={styles.layout}>
      <Navbar />
      <div style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Menu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
