import styles from "../styles/Home.module.css";
import HiveBlog from "../components/home/HiveFeed";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>       
        <HiveBlog />
      </main>
    </div>
  );
}
