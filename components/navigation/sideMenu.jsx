import React, { useState } from "react";
import { FaUpload, FaWallet, FaHome, FaUser, FaCog } from 'react-icons/fa';
import styles from "../../styles/sideMenu.module.css";
import Router from "next/router";
import Link from "next/link";

function SideMenu({ showSideMenu, setShowSideMenu }) {
  const handleOpenMenu = () => {
    setShowSideMenu(true);
  };

  const handleCloseMenu = (e, path) => {
    setShowSideMenu(false);
    console.clear()
    console.log("clicked")
  };

  return (
    <div
      className={styles.sideMenu}
      style={{
        width: showSideMenu ? "20%" : "50px",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div className={styles.hamburgerButton} onClick={handleCloseMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <ul className={styles.menuItems} style={{ display: showSideMenu ? "block" : "none" }}>
        <li onClick={(e) => handleCloseMenu (e, "/")}>
        <Link href={"/"}><FaHome /> Home</Link>
        </li>
        <li onClick={(e) => handleCloseMenu (e, "/profile")}>
        <Link className={styles.menuItems} href={"/profile"}><FaUser /> Profile</Link>
        </li>
        <li onClick={(e) => handleCloseMenu (e, "/wallet")}>
          <Link href={"/wallet"}><FaWallet /> Wallet</Link>
        </li>
        <li onClick={(e) => handleCloseMenu (e, "/post")}>
          <Link href={"/post"}><FaUpload /> Post </Link> 
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
            <FaWallet />
          </div>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaUpload />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideMenu;
