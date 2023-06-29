import { useEffect, useState } from "react";
import { Client } from "@hiveio/dhive";
import styles from "../../styles/HiveFeed.module.css";
import useAuthUser from "../../pages/api/UseAuthUser.js";
import PostModal from "../../components/PostModal";

const client = new Client([
  "https://api.hive.blog",
  "https://anyx.io",
  "https://api.pharesim.me"
]);

export default function AuthorBlog() {
  const { user } = useAuthUser();
  const username = user ? user.name : "";
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const query = {
        tag: username,
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
  }, [username]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
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
        <center>
          <h2>Roll a joint...</h2>
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
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
