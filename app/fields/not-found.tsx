import { TbFileSad } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center mt-30 text-2xl gap-3">
      Field not found <TbFileSad size={30}/>
    </div>
  );
};

export default NotFound;
