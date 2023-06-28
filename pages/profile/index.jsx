import { useState, useEffect } from "react";
import useAuthUser from "../api/UseAuthUser.js";
import styles from "../../styles/Profile.module.css";
import AuthorBlog from "../../components/profile/AuthorBlog.jsx";
import ChannelNav from "../../components/profile/channelMenu.jsx";

export default function HiveProfile() {
  const { user } = useAuthUser();
  const [isLoading, setIsLoading] = useState(true);
  const [coverImageUrl, setCoverImageUrl] = useState(null);

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
  }, [user]);

  return (
    <div>
      {isLoading ? (
        <div><h3>Refresh the page after log in, our dev sucks !!</h3></div>
      ) : (
        <>
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
          <div>
            <ChannelNav></ChannelNav>
          </div>
        </>
      )}
    </div>
  );
}
