import Image from "next/image";
import { getFields } from "../_services/dataService";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "Fields",
};

const Page = async () => {
  const fields = await getFields();

  return (
    <div>
      <header>
        <h2 className="text-primary-300 font-bold text-4xl">
          Our Football Fields
        </h2>
        <p className="text-primary-300 leading-6 text-md my-8">
          Modern, well-kept football fields, ready for your next match. Picture
          yourself stepping onto fresh green turf, gathering your friends, and
          playing under the lights late into the evening. Whether it’s a quick
          game after work or a weekend tournament, you can book your spot with
          just a few clicks. Football made easy, fun, and hassle-free. Welcome
          to your game.
        </p>
      </header>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-20 gap-y-15">
        {fields?.map((field) => (
          <div key={field.id} className="border border-primary-900">
            <div className="flex">
              <div className="flex-3 relative min-h-64">
                <Image
                  src={field.image}
                  fill
                  quality={100}
                  className="object-cover"
                  alt={`${field.name} image`}
                />
              </div>
              <div className="flex-2 p-5 relative">
                <p className="text-4xl text-primary-300">{field.name}</p>
                <p className="absolute bottom-5 right-5 text-primary-200 text-5xl font-medium">
                  ${field.price}
                  <span className="text-primary-300 text-lg"> / hour</span>
                </p>
              </div>
            </div>
            <div className="border-t border-primary-900 flex justify-end">
              <Link
                href={`/fields/${field.id}`}
                className="flex gap-2 items-center text-md px-7 py-4 border-l border-primary-900 cursor-pointer hover:bg-primary-900 transition-colors duration-300"
              >
                More Info & Reservation
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
