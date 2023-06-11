import { useState, useEffect } from "react";
import { KeychainSDK } from "keychain-sdk";
import * as dhive from "@hiveio/dhive";

export default function useAuthUser() {
  const dhiveClient = new dhive.Client([
    "https://api.hive.blog",
    "https://api.hivekings.com",
    "https://anyx.io",
    "https://api.openhive.network",
  ]);
  const [user, setUser] = useState(null);
  const [keychain, setKeychain] = useState(null); // Added keychain state
  const [authUserInfo, setAuthUserInfo] = useState(null);
  const [hiveBalance, setHiveBalance] = useState(null);
  const [hbdBalance, setHbdBalance] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    const keychainData = sessionStorage.getItem("keychain"); // Get keychain info from session storage
    if (keychainData) {
      setKeychain(JSON.parse(keychainData));
    }
  }, []);

  const loginWithHive = async (username) => {
    if (typeof window === "undefined" || !window.hive_keychain) {
      alert("Please install Hive Keychain first");
      return;
    }

    if (!username) {
      alert("Please enter your username");
      return;
    }

    const memo = username + Date.now();

    window.hive_keychain.requestSignBuffer(
      username,
      memo,
      "Posting",
      async (response) => {
        if (response.success === true) {
          console.log(response)
          const publicKey = response.publicKey;
          try {
            const val = await dhiveClient.keys.getKeyReferences([publicKey]);
            const accountName = val.accounts[0][0];
            if (accountName === username) {
              const sig = dhive.Signature.fromString(response.result);
              const key = dhive.PublicKey.fromString(publicKey);
              if (key.verify(dhive.cryptoUtils.sha256(memo), sig) === true) {
                const val2 = await dhiveClient.database.getAccounts([accountName]);

                // Prepare the data for Keychain login
                const data = {
                  username: accountName,
                  message: JSON.stringify({ login: response.result }),
                  method: "Posting",
                  title: "Login",
                };

                // Call Keychain login function if in browser environment
                if (typeof window !== "undefined") {
                  const keychain = new KeychainSDK(window);
                  const loginResult = await keychain.login(data);
                  console.log("Login object from Keychain SDK:", loginResult); // Log the login object from Keychain SDK

                  // Handle the login result from Keychain
                  if (loginResult) {
                    setUser(val2[0]);
                    setAuthUserInfo(val2[0]); // Store authenticated user's information
                    setKeychain(loginResult); // Store keychain info
                    sessionStorage.setItem("user", JSON.stringify(val2[0]));
                    sessionStorage.setItem("keychain", JSON.stringify(loginResult)); // Save keychain info in session storage
                  }
                }
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
    setKeychain(null); // Reset keychain state
    setAuthUserInfo(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("keychain"); // Remove keychain info from session storage
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const getBalances = async () => {
    if (user) {
      const account = await dhiveClient.database.getAccounts([user.name]);
      if (account.length > 0) {
        setHiveBalance(account[0].balance.split(" ")[0]);
        setHbdBalance(account[0].hbd_balance.split(" ")[0]);
      }
    }
  };

  useEffect(() => {
    getBalances();
  }, [user]);

  return {
    user,
    keychain, // Include keychain in the return object
    loginWithHive,
    logout,
    isLoggedIn,
    hiveBalance,
    hbdBalance,
  };
}
