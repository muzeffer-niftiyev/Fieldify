import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Navbar from "./_components/Navbar";
import "@/app/_styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} font-bold antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <Navbar />
        <div className="flex-1 px-10 py-14 w-full">
          <main className="max-w-6xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}



// Field Information

// Field name / number (e.g., "Arena 1" or "Central Turf")

// Location (address, map link, maybe Google Maps embed)

// Surface type (natural grass, artificial turf, futsal court, etc.)

// Field size / type (5-a-side, 7-a-side, 11-a-side)

// Lighting (day only / night lighting available)

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