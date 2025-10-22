import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Navbar from "./_components/Navbar";
import "@/app/_styles/globals.css";

import { AddReservationProvider } from "./_context/AddReservationContext";

const quicksand = Quicksand({
  weight: ["700", "600", "500", "400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fieldify",
    default: "Welcome | Fieldify",
  },
  description: "Football Field reservation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} font-bold antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <AddReservationProvider>
          <Navbar />
          <div className="flex flex-1 px-10 py-14 w-full">
            <main className="max-w-7xl mx-auto flex-1">{children}</main>
          </div>
        </AddReservationProvider>
      </body>
    </html>
  );
}

// Set up the react hot toast

// Field Information

// Location (address, map link, maybe Google Maps embed)

// Facilities (showers, locker rooms, parking, seating)

// 💰 Pricing & Booking

// Price per hour (and whether it changes by time/day)

// Available time slots (calendar or booking schedule)

// Booking duration rules (minimum/maximum time per booking)

// Cancellation policy

// 📸 Media & Visuals

// Photos of the field (and facilities)

// Virtual tour / short video (optional, but engaging)

// 👥 Extra Details

// Capacity (how many players can comfortably play)

// Equipment availability (balls, bibs, goals, nets)

// Services (referee, coach, refreshments)

// ⚡️ Nice-to-have (but optional)

// User reviews & ratings

// Upcoming tournaments or leagues

// Special offers / memberships
