import styles from "../styles/Home.module.css";
import HiveBlog from "../components/HiveFeed";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>       
        <HiveBlog />
        <center>
        <h2>Powered by Skatehive</h2>
        </center>
      </main>
    </div>
  );
}
