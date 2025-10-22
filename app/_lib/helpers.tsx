import { IoPersonOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

export const accountNavigationLinks = [
  {
    name: "Profile",
    href: "/account",
    icon: <IoPersonOutline />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <FaCalendarAlt />,
  },
];

export const fromHours = Array.from({ length: 9 }, (_, i) => 12 + i);
export const toHours = Array.from({ length: 9 }, (_, i) => 13 + i);
export const allHours = Array.from({ length: 9 }, (_, i) => 12 + i);

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

export const getDayDifference = (startDate: Date) => {
  const now = new Date();
  const start = new Date(startDate);
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startMid = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const dayDifference = Math.round(
    (+startMid - +nowMid) / (24 * 60 * 60 * 1000)
  );

  if (dayDifference === 0) {
    return "today";
  } else if (dayDifference === 1) {
    return "tomorrow";
  } else if (Math.abs(dayDifference) === 1) {
    return "yesterday";
  } else if (dayDifference > 0) {
    return `in ${dayDifference} days`;
  } else {
    return `${Math.abs(dayDifference)} days ago`;
  }
};
