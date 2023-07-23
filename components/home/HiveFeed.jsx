import { useEffect, useState } from "react";
import { Client } from "@hiveio/dhive";
import styles from "./HiveFeed.module.css";
import PostModal from "../post/PostModal";
import LoadingBar from '../fx/LoadingBar.jsx';

const client = new Client([
  "https://api.hive.blog",
  "https://anyx.io",
  "https://api.pharesim.me",
]);

// Function to calculate post earnings (placeholder value: $69.42)
const postEarnings = () => {
  const placeholderEarnings = 69.42; // Replace with actual earnings data from the post
  return `$${placeholderEarnings.toFixed(2)}`;
};

export default function HiveBlog(query) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("skatehive"); // set the default search author to "skatehive"
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const query = {
        tag: tag,
        limit: 100,
      };
      const result = await client.database.getDiscussions("created", query);

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    console.log(post.body)
  };

  const handleModalClose = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      {selectedPost && (
        <div className={styles.modalContainer}>
          <PostModal
            title={selectedPost.title}
            content={selectedPost.body}
            permlink={selectedPost.permlink}
            author={selectedPost.author}
            onClose={handleModalClose}
          />
        </div>
      )}
      {isLoading ? (
        <center style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <LoadingBar />
        </center>
      ) : (
        <div className={styles.posts}>
          {posts.map((post) => (
            <a
              key={post.permlink}
              className={styles.post}
              onClick={() => handlePostClick(post)}
            >
              <div className={styles.postInfo}>
                <div className={styles.authorInfo}>
                  <img
                    src={`https://images.ecency.com/webp/u/${post.author}/avatar/small`}
                    alt="author avatar"
                    className={styles.authorAvatar}
                  />
                  <p className={styles.authorName}>{post.author}</p>
                </div>
                <br></br>
                <img src={post.thumbnail} alt="post thumbnail" className={styles.postThumbnail} />
                <br></br>
                <p className={styles.postTitle}>{post.title}</p>

                {/* Display post earnings */}
                <div className={styles.postEarnings}>{postEarnings()}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
