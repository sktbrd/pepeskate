import { useEffect, useState } from "react";
import { Client } from "@hiveio/dhive";
import styles from "./HiveFeed.module.css";
import PostModal from "../post/PostModal";
import LoadingBar from "../fx/LoadingBar.jsx";

const nodes = [
  "https://rpc.ecency.com",
  "https://api.deathwing.me",
  "https://api.hive.blog",
  "https://api.openhive.network",
  "https://api.hive.blog",
  "https://anyx.io",
  "https://api.pharesim.me",
];

const defaultThumbnail = "https://images.ecency.com/u/hive-173115/avatar/large";
const placeholderEarnings = 69.42; // Replace with actual placeholder value

export default function HiveBlog(query) {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState("skatehive"); // set the default search author to "skatehive"
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [client, setClient] = useState(new Client(nodes[0]));
  const [nodeIndex, setNodeIndex] = useState(0);

  const fetchPostEarnings = async (author, permlink) => {
    try {
      const post = await client.database.call("get_content", [author, permlink]);
      const totalPayout = parseFloat(post.total_payout_value.split(" ")[0]);
      const curatorPayout = parseFloat(post.curator_payout_value.split(" ")[0]);
      const pendingPayout = parseFloat(post.pending_payout_value.split(" ")[0]);
      const totalEarnings = totalPayout + curatorPayout + pendingPayout;
      return totalEarnings;
    } catch (error) {
      // If a request fails, switch to the next node
      const newIndex = (nodeIndex + 1) % nodes.length;
      setNodeIndex(newIndex);
      setClient(new Client(nodes[newIndex]));
      console.log(`Switched to node: ${nodes[newIndex]}`);
      // Retry the request with the new node
      return fetchPostEarnings(author, permlink);
    }
  };
  

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
        const thumbnail =
          Array.isArray(metadata?.image) && metadata.image.length > 0
            ? metadata.image[0]
            : defaultThumbnail;
        return { ...post, thumbnail, earnings: 0 }; // Initialize earnings to 0
      });

      // Fetch earnings for each post concurrently
      const earningsPromises = postsWithThumbnails.map((post) =>
        fetchPostEarnings(post.author, post.permlink).catch((error) => {
          console.log(error);
          return placeholderEarnings; // Use placeholder value if fetching actual earnings fails
        })
      );
      const earnings = await Promise.all(earningsPromises);

      // Update earnings for each post
      for (let i = 0; i < postsWithThumbnails.length; i++) {
        postsWithThumbnails[i].earnings = earnings[i];
      }

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
    console.log(post.body);
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
        <center
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
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
                <img
                  src={post.thumbnail}
                  alt="post thumbnail"
                  className={styles.postThumbnail}
                />
                <br></br>
                <p className={styles.postTitle}>{post.title}</p>

                {/* Display post earnings */}
                <div className={styles.postEarnings}>
                  {`$${post.earnings.toFixed(2)}`}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
