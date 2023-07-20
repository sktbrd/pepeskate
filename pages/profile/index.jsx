import { useState, useEffect } from "react";
import useAuthUser from "../api/UseAuthUser.js";
import styles from "../../styles/Profile.module.css";
import AuthorBlog from "../../components/profile/AuthorBlog.jsx";
import ChannelNav from "../../components/profile/channelMenu.jsx";

export default function HiveProfile() {
  const { user } = useAuthUser();
  const [isLoading, setIsLoading] = useState(true);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [url, setUrl] = useState(""); // Add this line

  useEffect(() => {
    const fetchCoverImage = async () => {
      if (user) {
        try {
          const metadata = JSON.parse(user.posting_json_metadata);
          const coverImage = metadata.profile.cover_image;
          setCoverImageUrl(coverImage);
          setIsLoading(false);
        } catch (error) {
          console.error("Error parsing JSON metadata:", error);
        }
      }
    };

    fetchCoverImage();
    setUrl(window.location.href); // Add this line
  }, [user]);

  return (
    <div>
      {isLoading ? (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px",
          color: "limegreen",
          textAlign: "center"
        }}>
          <a href={url}> {/* Use the url state variable here */}
            <img src="https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif" alt="" />
          </a>
          <h2 style={{
          color: "limegreen",     
        }}>Click in the Pepe Head to enter the pepeskate world</h2>
        </div>
      ) : (
        <div className={styles.profile_container}>
          {coverImageUrl && (
            <div
              className={styles.cover}
              style={{
                backgroundImage: `url(${coverImageUrl})`
              }}
            />
          )}
          <div className={styles.avatar_container}>
            <img
              src={`https://images.hive.blog/u/${user.name}/avatar`}
              alt="profile avatar"
              className={styles.avatar}
            />
            <div className={styles.name}>{user.name}</div>
          </div>
        </div>
      )}
      <div>
        <ChannelNav></ChannelNav>
      </div>
    </div>
  );
}
