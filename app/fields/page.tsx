import Image from "next/image";
import { getFields } from "../_services/dataService";

export const metadata = {
  title: "Fields",
};

const Page = async () => {
  const fields = await getFields();

  return (
    <div>
      <header>
        <h2 className="text-secondary-700 font-bold text-4xl">
          Our Football Fields
        </h2>
        <p className="text-primary-300 leading-6 text-md my-6">
          Modern, well-kept football fields, ready for your next match. Picture
          yourself stepping onto fresh green turf, gathering your friends, and
          playing under the lights late into the evening. Whether it’s a quick
          game after work or a weekend tournament, you can book your spot with
          just a few clicks. Football made easy, fun, and hassle-free. Welcome
          to your game.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-x-20 gap-y-15">
        {fields?.map((field) => (
          <div key={field.id} className="border border-primary-900">
            <div className="flex">
              <Image
                src={field.image}
                width={300}
                height={300}
                alt={`${field.name} image`}
              />
              <div className="p-5 relative w-full">
                <p className="text-4xl text-secondary-800">{field.name}</p>
                <p className="absolute bottom-5 right-5 text-primary-200 text-4xl font-medium">
                  ${field.price}
                  <span className="text-primary-300 text-lg"> / hour</span>
                </p>
              </div>
            </div>
            <div className="border-t border-primary-900 flex justify-end">
              <button className="text-md px-7 py-4 border-l border-primary-900 cursor-pointer hover:bg-secondary-900 transition-colors duration-300">
                Reservation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
