import React, { useState, useEffect } from "react";
import { FaMap, FaUpload, FaWallet, FaHome, FaUser, FaCog } from 'react-icons/fa';
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
      style={{
        width: showSideMenu ? "30%" : "50px",
        transition: "all 0.1s ease-in-out",
      }}
    >
      <ul className={styles.menuItems} style={{ display: showSideMenu ? "block" : "none" }}>
        <li onClick={(e) => handleCloseMenu(e, "/")}>
          <Link href={"/"}><FaHome /> Home</Link>
        </li>
        {user && (
          <li onClick={(e) => handleCloseMenu(e, "/profile")}>
            <Link href={"/profile"}><FaUser /> {username ? username : "Profile"}</Link>
          </li>
        )}
        {user && (
          <li onClick={(e) => handleCloseMenu(e, "/wallet")}>
            <Link href={"/wallet"}><FaWallet /> Wallet</Link>
          </li>
        )}
        <li onClick={(e) => handleCloseMenu(e, "/post")}>
          <Link href={"/post"}><FaUpload /> Post </Link> 
        </li>
        <li onClick={(e) => handleCloseMenu(e, "https://discord.gg/skatehive")}>
          <Link href={"https://discord.gg/skatehive"}><FaUser /> Sign Up </Link> 
        </li>
        <li onClick={(e) => handleCloseMenu(e, "/map")}>
          <Link href={"/post"}><FaMap /> Go Skate </Link> 
        </li>
        {user ? (
          <li onClick={logout}>
            <FaUpload /> Logout
          </li>
        ) : (
          <li className={styles.iconMenu} onClick={() => setShowHiveLoginModal(true)}>
            <FaUpload /> HiveLogin
          </li>
        )}
        <HiveLoginModal showModal={showHiveLoginModal} handleClose={() => setShowHiveLoginModal(false)} handleHiveLogin={handleHiveLogin} setUsername={setUsername} />
      </ul>
      {!showSideMenu && (
        <div className={styles.iconMenu}>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaHome />
          </div>
          {user && (
            <div className={styles.menuItems} onClick={handleOpenMenu}>
              <FaUser />
            </div>
          )}
          {user && (
            <div className={styles.menuItems} onClick={handleOpenMenu}>
              <FaWallet />
            </div>
          )}
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaUpload />
          </div>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaUser />
          </div>
          <div className={styles.menuItems} onClick={handleOpenMenu}>
            <FaUser />
          </div>
        </div>
      )}
    </div>
  );      
}

export default SideMenu
