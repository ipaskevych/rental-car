import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarDetails from "@/components/CarDetails/CarDetails";
import { getCarById } from "@/lib/api/cars";

const getCar = cache(async (id: string) => {
  try {
    return await getCarById(id);
  } catch {
    return null;
  }
});

interface PageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) return { title: "Car not found | RentalCar" };

  return {
    title: `${car.brand} ${car.model}, ${car.year} | RentalCar`,
    description: car.description,
  };
}

export default async function CarPage({ params }: PageProps) {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) notFound();

  return (
    <main>
      <CarDetails car={car} />
    </main>
  );
}
