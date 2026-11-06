import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.text}>Loading, please wait</p>
    </div>
  );
}
