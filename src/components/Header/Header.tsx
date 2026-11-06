"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="RentalCar, home page">
        Rental<span className={styles.logoAccent}>Car</span>
      </Link>

      <nav aria-label="Main navigation">
        <ul className={styles.list}>
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${isActive(href) ? styles.active : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
