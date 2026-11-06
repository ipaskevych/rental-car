import Image from "next/image";
import type { Car } from "@/types/car";
import Button from "../Button/Button";
import styles from "./CarCard.module.css";
import { formatMileage } from "@/lib/format";

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    rentalCompany,
    type,
    mileage,
    location,
  } = car;

  const rows = [
    [location.city, location.country, rentalCompany],
    [type, formatMileage(mileage)],
  ];

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={img}
          alt={`${brand} ${model}`}
          width={244}
          height={268}
          priority={priority}
          className={styles.image}
        />
      </div>

      <div className={styles.titleRow}>
        <h2 className={styles.title}>
          {brand} <span className={styles.accent}>{model}</span>, {year}
        </h2>
        <p className={styles.price}>${rentalPrice}</p>
      </div>

      <div className={styles.details}>
        {rows.map((row, index) => (
          <ul key={index} className={styles.row}>
            {row.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>

      <Button href={`/catalog/${id}`} newTab className={styles.button}>
        Read more
      </Button>
    </article>
  );
}
