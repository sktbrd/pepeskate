import React, { useState } from "react";
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import styles from "../../styles/sideMenu.module.css";

function SideMenu({ showSideMenu, setShowSideMenu }) {
  const handleOpenMenu = () => {
    setShowSideMenu(true);
  };

  const handleCloseMenu = () => {
    setShowSideMenu(false);
  };

  return (
    <div
      className={styles.sideMenu}
      style={{
        width: showSideMenu ? "10%" : "50px",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div className={styles.hamburgerButton} onClick={handleCloseMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <ul className={styles.menuItems} style={{ display: showSideMenu ? "block" : "none" }}>
        <li onClick={handleCloseMenu}>
          <FaHome /> Home
        </li>
        <li onClick={handleCloseMenu}>
          <FaUser /> Profile
        </li>
        <li onClick={handleCloseMenu}>
          <FaCog /> Settings
        </li>
        <li onClick={handleCloseMenu}>
          <FaCog /> NFT Wallet 
        </li>
        <li onClick={handleCloseMenu}>
          <FaCog /> Post 
        </li>
      </ul>
      {!showSideMenu && (
        <div className={styles.iconMenu}>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaHome />
          </div>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaUser />
          </div>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaCog />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideMenu;
