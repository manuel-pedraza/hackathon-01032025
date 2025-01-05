import styles from "./styles/page.module.css";
export default async function Home() {
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="banner">
          <h1>Welcome to My Website</h1>
          <p>Your one-stop destination for all your needs</p>
          <button onclick="window.location.href='#learn-more'">Learn More</button>
        </div>
      </main>
    </div>
  );
}
