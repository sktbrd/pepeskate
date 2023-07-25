import React, { useState, useEffect } from "react";
import { FaDiscord, FaUpload, FaWallet, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import {MdOutlineSkateboarding} from 'react-icons/md';
import styles from "./Menu.module.css";
import Link from "next/link";
import HiveLoginModal from "./HiveLoginModal.jsx";
import useAuthUser from "../../pages/api/UseAuthUser.js";
import { useRouter } from "next/router";

function Menu({ showSideMenu, setShowSideMenu }) {
  const router = useRouter();
  const { user, logout } = useAuthUser();
  const [showHiveLoginModal, setShowHiveLoginModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleOpenMenu = () => {
    setShowSideMenu(true);
  };

  const handleCloseMenu = (e, path) => {
    setShowSideMenu(false);
    console.log("closed menu")
  };

  const handleHiveLogin = (username) => {
    setUsername("");
    setShowHiveLoginModal(false);
    console.log(`Logged in as ${user.name}`);
    router.push("/profile");
  }

  useEffect(() => {
    setUsername(user ? user.name : "");
  }, [user]);

  return (
    <div
      className={styles.sideMenu}

    >
      
      <ul className={styles.menuItems} style={{ display: showSideMenu ? "block" : "none" }}>
        <li className={styles.iconMenu} onClick={(e) => handleCloseMenu(e, "/")}>
          <Link href={"/"}><FaHome /> Home</Link>
        </li>
        {user && (
          <li className={styles.iconMenu} onClick={(e) => handleCloseMenu(e, "/profile")}>
            <Link href={"/profile"}><FaUser /> {username ? username : "Profile"}</Link>
          </li>
        )}
        {user && (
          <li className={styles.iconMenu} onClick={(e) => handleCloseMenu(e, "/wallet")}>
            <Link href={"/wallet"}><FaWallet /> Wallet</Link>
          </li>
        )}
        {user && (
          <li className={styles.iconMenu} onClick={(e) => handleCloseMenu(e, "/upload")}>
            <Link href={"/upload"}><FaUpload/> Post </Link> 
          </li>
        )}
        {user ? (
          <li className={styles.iconMenu} onClick={logout}>
            <FaSignOutAlt /> Logout
          </li>
        ) : (
          <li onClick={() => setShowHiveLoginModal(true)}>
            <FaUser /> HiveLogin
          </li>
        )}
        <HiveLoginModal showModal={showHiveLoginModal} handleClose={() => setShowHiveLoginModal(false)} handleHiveLogin={handleHiveLogin} setUsername={setUsername} />
      </ul>
      {!showSideMenu && (
        <div className={styles.iconMenu}>
          <div className={styles.menu} onClick={handleOpenMenu}>
            <MdOutlineSkateboarding />
            <span>Menu</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default Menu;
