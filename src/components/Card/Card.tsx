import React from "react";
interface CardProps {
  id: number;
  name: string;
  image: string;
  flipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ id, name, image, flipped, onClick }) => {
  return (
    <div className="w-36 h-48 m-2 perspective">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        onClick={onClick}
      >
        <div className={`absolute w-full h-full backface-hidden ${flipped ? "" : "backface-hidden"}`}>
          <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div
          className={`absolute w-full h-full bg-blue-500 text-white flex justify-center items-center  transform  rounded-lg ${
            flipped ? "backface-hidden rotate-y-180" : ""
          }`}
        >
          <img
            src="https://pnghq.com/wp-content/uploads/rick-and-morty-logo-png-png-graphic-download-72914-1536x1536.png"
            alt="defaul_img"
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
