import { useEffect, useState } from "react";
import { getDhive } from "../_app";

export default function Profile({ username }) {
  const [user, setUser] = useState(null);
  const { dhive } = getDhive();

  useEffect(() => {
    const fetchUser = async () => {
      const dhiveClient = new dhive.Client([
        "https://api.hive.blog",
        "https://api.hivekings.com",
        "https://anyx.io",
        "https://api.openhive.network",
      ]);
      const [userData] = await dhiveClient.database.getAccounts([username]);
      setUser(userData);
    };
    fetchUser();
  }, [username]);

  if (!user) {
    return <div>Roll a joint...</div>;
  }

  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <img src={user.profile_image} alt="Profile" />
      <p>{user.about}</p>
      <ul>
        <li>Name: {user.name}</li>
      </ul>
    </div>
  );
}
