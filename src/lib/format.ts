export const formatMileage = (mileage: number) =>
  `${mileage.toLocaleString("en-US").replace(/,/g, " ")} km`;
