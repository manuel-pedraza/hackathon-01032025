import Image from "next/image";
import styles from "./styles/page.module.css";
import { profileController } from "@/actions/profileController";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="recipes banner">
          Recipes banner
        </div>

      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
