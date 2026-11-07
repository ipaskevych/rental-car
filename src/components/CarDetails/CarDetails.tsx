import Image from "next/image";
import {
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiSettings,
} from "react-icons/fi";
import { FaCar, FaRoad } from "react-icons/fa";
import { BsFuelPump } from "react-icons/bs";
import type { Car } from "@/types/car";
import { formatMileage } from "@/lib/format";
import BookingForm from "../BookingForm/BookingForm";
import styles from "./CarDetails.module.css";

export default function CarDetails({ car }: { car: Car }) {
  const specs = [
    { icon: <FiCalendar />, text: `Year: ${car.year}` },
    { icon: <FaCar />, text: `Type: ${car.type}` },
    { icon: <BsFuelPump />, text: `Fuel Consumption: ${car.fuelConsumption}` },
    { icon: <FiSettings />, text: `Engine: ${car.engine}` },
    { icon: <FaRoad />, text: `Mileage: ${formatMileage(car.mileage)}` },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            priority
            className={styles.image}
          />
          <BookingForm carId={car.id} />
        </div>

        <div className={styles.info}>
          <section className={styles.block}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>
                {car.brand} {car.model}, {car.year}
              </h1>
              <span className={styles.article}>Article: {car.stockNumber}</span>
            </div>
            <p className={styles.location}>
              <FiMapPin aria-hidden="true" />
              {car.location.city}, {car.location.country}
            </p>
            <p className={styles.price}>${car.rentalPrice}</p>
            <p className={styles.description}>{car.description}</p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.heading}>Rental Conditions:</h2>
            <ul className={styles.list}>
              {car.rentalConditions.map((item) => (
                <li key={item}>
                  <FiCheckCircle aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h2 className={styles.heading}>Car Specifications:</h2>
            <ul className={styles.list}>
              {specs.map(({ icon, text }) => (
                <li key={text}>
                  {icon}
                  {text}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h2 className={styles.heading}>Features</h2>
            <ul className={styles.list}>
              {car.features.map((item) => (
                <li key={item}>
                  <FiCheckCircle aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
