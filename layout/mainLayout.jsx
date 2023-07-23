import Navbar from "../components/navigation/navbar";
import SideMenu from "../components/navigation/Menu";
import { useState } from "react";
import styles from './mainLayout.module.css'; // Import the CSS module

export default function Layout({ children }) {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <div className={styles.layout}>
      <Navbar/>
      <div style={{  justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
