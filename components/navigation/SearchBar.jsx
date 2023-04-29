import { useState } from "react";
import styles from "../../styles/HiveFeed.module.css";
import fetchPosts from "../HiveFeed";

export default function SearchBar({ onSearch }) {
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(tag);
  };

  return (
    <form className={styles.search_bar} onSubmit={fetchPosts}>
      <input
        type="text"
        placeholder=""
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
    </form>
  );
}
