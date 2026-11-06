"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { createBooking } from "@/lib/api/cars";
import Button from "../Button/Button";
import styles from "./BookingForm.module.css";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Please enter your full name.")
    .matches(/^\p{L}[\p{L}\s'’-]*$/u, "Please enter your full name."),
  email: yup
    .string()
    .trim()
    .required("Please enter your email.")
    .email("Please enter a valid email."),
  comment: yup.string().trim().required("Comment is required."),
});

type BookingFormValues = yup.InferType<typeof schema>;

export default function BookingForm({ carId }: { carId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", comment: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BookingFormValues) => createBooking(carId, values),
    onSuccess: (data) => {
      toast.success(data.message || "Your booking request has been sent.");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((values) => mutate(values))}
      noValidate
    >
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.fields}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Name*"
            aria-label="Name"
            aria-invalid={!!errors.name}
            className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <>
              <FiAlertCircle
                className={styles.icon}
                size={16}
                aria-hidden="true"
              />
              <p className={styles.error}>{errors.name.message}</p>
            </>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email*"
            aria-label="Email"
            aria-invalid={!!errors.email}
            className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <>
              <FiAlertCircle
                className={styles.icon}
                size={16}
                aria-hidden="true"
              />
              <p className={styles.error}>{errors.email.message}</p>
            </>
          )}
        </div>

        <div className={styles.field}>
          <textarea
            placeholder="Comment"
            aria-label="Comment"
            aria-invalid={!!errors.comment}
            className={`${styles.input} ${styles.textarea} ${errors.comment ? styles.invalid : ""}`}
            {...register("comment")}
          />
          {errors.comment && (
            <>
              <FiAlertCircle
                className={styles.icon}
                size={16}
                aria-hidden="true"
              />
              <p className={styles.error}>{errors.comment.message}</p>
            </>
          )}
        </div>
      </div>

      <Button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
