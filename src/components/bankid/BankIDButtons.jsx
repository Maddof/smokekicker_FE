// import Image from "next/image";
import ArrowNextIcon from "../../../public/images/icons/arrow-next-right.svg";

const BankIDButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center border-b-2 pb-2 pt-2 tracking-wider transition-all hover:border-b-red-400 hover:text-red-400"
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="ml-auto hover:stroke-red-400"
        fill="none"
        stroke="currentColor" // Use currentColor to make the color dynamic
        strokeWidth={18}
        width={20}
        height={20}
      >
        <path d="M146.662,26.814L358.221,238.27c10.755,10.222,10.755,26.193,0,36.414L146.662,486.139"></path>
      </svg>
    </button>
  );
};

export default BankIDButton;
