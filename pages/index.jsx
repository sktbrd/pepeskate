import styles from "../styles/Home.module.css";
import HiveFeed from "../components/hiveFeed";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <HiveFeed />
      </main>
    </div>
  );
}
