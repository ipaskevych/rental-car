"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  formatValue?: (value: string) => string;
  className?: string;
}

export default function Dropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  formatValue,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const shownValue = value
    ? formatValue
      ? formatValue(value)
      : value
    : placeholder;

  return (
    <div className={`${styles.root} ${className}`} ref={rootRef}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{shownValue}</span>
        <FiChevronDown
          size={20}
          aria-hidden="true"
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={`${styles.option} ${option === value ? styles.selected : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
