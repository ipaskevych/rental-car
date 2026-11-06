"use client";

import { useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/cars";
import type { CarsFilters } from "@/types/car";
import Button from "../Button/Button";
import CarCard from "../CarCard/CarCard";
import FilterBar from "../FilterBar/FilterBar";
import Loader from "../Loader/Loader";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import NoCarsFound from "../NoCarsFound/NoCarsFound";
import styles from "./CatalogClient.module.css";

export default function CatalogClient() {
  const [filters, setFilters] = useState<CarsFilters>({});
  const [resetKey, setResetKey] = useState(0);

  const {
    data,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) => getCars({ page: pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  const isLoading = isFetching && !isFetchingNextPage;

  const handleReset = () => {
    setFilters({});
    setResetKey((key) => key + 1);
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.visuallyHidden}>Car catalog</h1>

      <FilterBar key={resetKey} onSearch={setFilters} />

      <div className={styles.content}>
        {isLoading && <LoadingOverlay />}

        {isError && !isFetching && (
          <p className={styles.message}>
            Something went wrong. Please try again later.
          </p>
        )}

        {!isFetching && !isError && cars.length === 0 && (
          <NoCarsFound onReset={handleReset} />
        )}

        {cars.length > 0 && (
          <>
            <ul className={styles.grid}>
              {cars.map((car, index) => (
                <li key={car.id}>
                  <CarCard car={car} priority={index < 4} />
                </li>
              ))}
            </ul>

            {isFetchingNextPage && <Loader />}

            {hasNextPage && !isFetchingNextPage && (
              <Button
                variant="outline"
                className={styles.loadMore}
                onClick={() => fetchNextPage()}
              >
                Load more
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
