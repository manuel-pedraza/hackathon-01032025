import styles from "./styles/page.module.css";
export default async function Home() {
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="recipes banner">
          Recipes banner
        </div>
      </main>
    </div>
  );
}
