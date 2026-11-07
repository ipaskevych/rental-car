# RentalCar

Frontend of a car rental web application. Users can browse the catalog,
filter cars, view car details and send a booking request.

## Features

- Home page with a hero section and a call to action
- Catalog with backend filtering by brand, price and mileage (from / to)
- "Load more" pagination built with TanStack Query `useInfiniteQuery`
- Loading overlay, empty state ("No cars found") and error handling
- Car details page opened in a new tab: photo, description, rental
  conditions, specifications and features
- Booking form with validation (React Hook Form + Yup) and a success
  notification
- Page titles and descriptions for every page

## Tech stack

- Next.js (App Router) and TypeScript
- TanStack Query
- React Hook Form, Yup
- Axios
- CSS Modules
- React Icons, React Hot Toast

## Getting started

1. Clone the repository:

   ```bash
   git clone https://github.com/ipaskevych/rental-car.git
   cd rental-car
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

- `npm run build`: production build
- `npm start`: run the production build
- `npm run lint`: lint the code
- `npm run format`: format the code with Prettier

## API

Backend documentation: https://car-rental-api.goit.study/api-docs/

## Deployment

Live version: _add the Vercel link here_

## Author

Iryna Paskevych, [GitHub](https://github.com/ipaskevych)
