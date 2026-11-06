import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.box}>
        <span className={styles.spinner} aria-hidden="true" />
        <div className={styles.text}>
          <p className={styles.title}>Loading cars...</p>
          <p className={styles.subtitle}>
            Please wait while we fetch the best cars for you
          </p>
        </div>
      </div>
    </div>
  );
}
