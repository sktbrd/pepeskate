import { useState, useEffect } from "react";
import { getDhive } from "../_app";

export default function useAuthUser() {
  const { dhive } = getDhive();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const loginWithHive = async (username) => {
    if (!window.hive_keychain) {
      alert("Please install Hive Keychain first");
      return;
    }

    if (!username) {
      alert("Please enter your username");
      return;
    }

    const dhiveClient = new dhive.Client([
      "https://api.hive.blog",
      "https://api.hivekings.com",
      "https://anyx.io",
      "https://api.openhive.network",
    ]);

    const memo = username + Date.now();

    window.hive_keychain.requestSignBuffer(
      username,
      memo,
      "Posting",
      async (response) => {
        if (response.success === true) {
          const publicKey = response.publicKey;
          try {
            const val = await dhiveClient.keys.getKeyReferences([publicKey]);
            const accountName = val.accounts[0][0];
            if (accountName === username) {
              const sig = dhive.Signature.fromString(response.result);
              const key = dhive.PublicKey.fromString(publicKey);
              if (key.verify(dhive.cryptoUtils.sha256(memo), sig) === true) {
                const val2 = await dhiveClient.database.getAccounts([accountName]);
                setUser(val2[0]);
                sessionStorage.setItem("user", JSON.stringify(val2[0]));
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return {
    user,
    loginWithHive,
    logout,
    isLoggedIn,
  };
}
