"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "@/lib/api/cars";
import type { CarsFilters } from "@/types/car";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./FilterBar.module.css";

type Draft = Required<CarsFilters>;

const EMPTY_DRAFT: Draft = {
  brand: "",
  price: "",
  minMileage: "",
  maxMileage: "",
};

function getPriceOptions(min: number, max: number): string[] {
  const options: string[] = [];
  for (let price = Math.ceil(min / 10) * 10; price <= max; price += 10) {
    options.push(String(price));
  }
  return options;
}

interface FilterBarProps {
  onSearch: (filters: CarsFilters) => void;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);

  const { data } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
    staleTime: Infinity,
  });

  const brands = data?.brands ?? [];
  const prices = data ? getPriceOptions(data.price.min, data.price.max) : [];

  const handleMileage =
    (field: "minMileage" | "maxMileage") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "");
      setDraft((prev) => ({ ...prev, [field]: digits }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(draft);
  };

  const handleClear = () => {
    setDraft(EMPTY_DRAFT);
    onSearch(EMPTY_DRAFT);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Dropdown
        className={styles.brand}
        label="Car brand"
        placeholder="Choose a brand"
        options={brands}
        value={draft.brand}
        onChange={(brand) => setDraft((prev) => ({ ...prev, brand }))}
      />

      <Dropdown
        className={styles.price}
        label="Price / 1 hour"
        placeholder="Choose a price"
        options={prices}
        value={draft.price}
        formatValue={(price) => `To $${price}`}
        onChange={(price) => setDraft((prev) => ({ ...prev, price }))}
      />

      <div
        className={styles.mileage}
        role="group"
        aria-labelledby="mileage-label"
      >
        <span id="mileage-label" className={styles.label}>
          Car mileage / km
        </span>
        <div className={styles.mileageFields}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="From"
            aria-label="Mileage from"
            className={styles.input}
            value={draft.minMileage}
            onChange={handleMileage("minMileage")}
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="To"
            aria-label="Mileage to"
            className={styles.input}
            value={draft.maxMileage}
            onChange={handleMileage("maxMileage")}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" className={styles.search}>
          Search
        </Button>
        <button type="button" className={styles.clear} onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
