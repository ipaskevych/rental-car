import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  href?: string;
  newTab?: boolean;
}

export default function Button({
  variant = "primary",
  href,
  newTab,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
