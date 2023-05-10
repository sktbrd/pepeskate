import { useEffect, useState } from "react";
import { Client } from "@hiveio/dhive";
import styles from "../../styles/HiveFeed.module.css";
import useAuthUser from "../../pages/api/UseAuthUser.js";

const client = new Client([
  "https://api.hive.blog",
  "https://anyx.io",
  "https://api.pharesim.me"
]);

export default function AuthorBlog() {
  const { user } = useAuthUser();
  console.log(user);
  const [tag, setTag] = useState(user?.name || "web-gnar");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const fetchPosts = async () => {
    setIsLoading(true);
  
    // Check if user is not null before setting the username
    if (user !== null) {
      setTag(user.name)
      console.log(username)
    }
  
    try {
      const query = {
        tag: tag,
        limit: 30,
      };
      const result = await client.database.getDiscussions("blog", query);
  
      const postsWithThumbnails = result.map((post) => {
        const metadata = JSON.parse(post.json_metadata);
        const thumbnail = metadata?.image?.[0];
        return { ...post, thumbnail };
      });
  
      setPosts(postsWithThumbnails);
    } catch (error) {
      console.log(error);
    }
  
    setIsLoading(false);
  };
  
  
  useEffect(() => {
    fetchPosts();
  }, [tag]);

  return (
    <div>
      {isLoading ? (
        <div>Roll a joint...</div>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post.permlink} className={styles.post}>
              <img src={post.thumbnail} alt="post thumbnail" />
              <div className={styles.postInfo}>
                <h3>{post.title}</h3>
                <p>Author: {post.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
