import { useState } from "react";
import styles from "../styles/HiveLoginModal.module.css";


export default function HiveLoginModal({
  showModal,
  handleClose,
  handleHiveLogin,
  username,
  setUsername,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleHiveLogin(username);
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <span className="close" onClick={handleClose}>
                &times;
              </span>
              <h3>Login with Hive Keychain</h3>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
