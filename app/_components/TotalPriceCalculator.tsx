import { useEffect } from "react";
import { useAddReservation } from "../_context/AddReservationContext";

const TotalPriceCalculator = ({ price }: { price: number }) => {
  const { hourRange, setTotalPrice } = useAddReservation();
  const hours = +hourRange.to - +hourRange.from;

  useEffect(() => {
    setTotalPrice(price * hours);
  }, [hourRange, price, hours, setTotalPrice]);

  return (
    <div className="bg-primary-900 mt-8 flex items-center gap-8">
      <div className="flex items-center justify-between w-[60%] border-r border-primary-800 px-6 py-4">
        <p className="text-primary-300 text-lg">${price} /hour</p>
        <p className="text-primary-300 text-lg">&times;{hours} hours</p>
      </div>
      <div className="w-[40%] px-6 py-4">
        <p className="text-lg text-primary-200">
          Total: <span className="text-2xl">${price * hours}</span>
        </p>
      </div>
    </div>
  );
};

export default TotalPriceCalculator;
