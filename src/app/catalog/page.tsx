import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient/CatalogClient";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description:
    "Browse the RentalCar catalog: filter by brand, price and mileage and find the right car for your trip.",
};

export default function CatalogPage() {
  return (
    <main>
      <CatalogClient />
    </main>
  );
}
