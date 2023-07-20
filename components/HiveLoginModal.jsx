import { useState } from "react";
import useAuthUser from "../pages/api/UseAuthUser.js";
import { useRouter } from "next/router";
import styles from "../styles/PostModal.module.css";

function HiveLoginModal({ showModal, handleClose }) {
  const [username, setUsername] = useState("");
  const { loginWithHive, user } = useAuthUser(); // Retrieve the user object from useAuthUser
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginWithHive(username);
    setUsername("");
    handleClose();
    router.push("/profile");
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignUp = () => {
    window.open("https://discord.gg/skatehive", "_blank");
  };

  const handleLogin = () => {
    console.log("User from dhive:", user); // Access user object from useAuthUser
    // Refresh the page after 7 seconds
    // setTimeout(() => {
    //   window.location.reload();
    // }, 7000);
  };

  return (
    <>
      {showModal && (
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <span className="close" onClick={handleClose}>
                &times;
              </span>
              <h4>Hive Keychain</h4>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className={styles.login_btn}
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className={styles.login_btn}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default HiveLoginModal;
