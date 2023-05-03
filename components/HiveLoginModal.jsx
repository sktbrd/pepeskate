import { useState } from "react";
import useAuthUser from "../pages/api/UseAuthUser.js";
import { useRouter } from "next/router";

export default function HiveLoginModal({ showModal, handleClose }) {
  const [username, setUsername] = useState("");
  const { loginWithHive } = useAuthUser();
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
