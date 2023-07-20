import React, { useState, useEffect } from "react";
import { FaMap, FaUpload, FaWallet, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from "../../styles/sideMenu.module.css";
import Link from "next/link";
import HiveLoginModal from "../HiveLoginModal";
import useAuthUser from "../../pages/api/UseAuthUser.js";
import { useRouter } from "next/router";

function SideMenu({ showSideMenu, setShowSideMenu }) {
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
          <Link href={"/"}><FaHome  /> Home</Link>
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
          <li className={styles.iconMenu} onClick={(e) => handleCloseMenu(e, "/post")}>
            <Link href={"/post"}><FaUpload/> Post </Link> 
          </li>
        )}
        {user ? (
          <li onClick={logout}>
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
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaHome />
          </div>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaUser />
          </div>
          {user && (
            <div className={styles.menuItems} onClick={handleOpenMenu}>
              <FaWallet />
            </div>
          )}
          {user && (
            <div className={styles.menuItems} onClick={handleOpenMenu}>
              <FaUpload />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideMenu;
