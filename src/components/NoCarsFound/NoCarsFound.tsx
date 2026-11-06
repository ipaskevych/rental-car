import Image from "next/image";
import Button from "../Button/Button";
import styles from "./NoCarsFound.module.css";

interface NoCarsFoundProps {
  onReset: () => void;
}

export default function NoCarsFound({ onReset }: NoCarsFoundProps) {
  return (
    <div className={styles.wrap}>
      <Image
        src="/images/not-found.svg"
        alt=""
        width={410}
        height={320}
        className={styles.image}
      />
      <h2 className={styles.title}>No cars found</h2>
      <p className={styles.text}>
        We couldn&apos;t find any cars that match your current filters. Try
        changing your search criteria or reset the filters.
      </p>
      <Button variant="outline" className={styles.button} onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}
