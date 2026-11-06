import { api } from "./client";
import type {
  BookingPayload,
  BookingResponse,
  Car,
  CarsFilters,
  CarsResponse,
  FiltersMeta,
} from "@/types/car";

export const CARS_PER_PAGE = 12;

interface GetCarsParams extends CarsFilters {
  page: number;
}

export async function getCars({
  page,
  brand,
  price,
  minMileage,
  maxMileage,
}: GetCarsParams): Promise<CarsResponse> {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      page,
      perPage: CARS_PER_PAGE,
      brand: brand || undefined,
      price: price || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    },
  });
  return data;
}

export async function getFilters(): Promise<FiltersMeta> {
  const { data } = await api.get<FiltersMeta>("/cars/filters");
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export async function createBooking(
  carId: string,
  payload: BookingPayload,
): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    payload,
  );
  return data;
}
