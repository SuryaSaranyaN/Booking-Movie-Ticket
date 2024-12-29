import React, { useState } from "react";

interface SeatSelectorProps {
  seats: string[];
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ seats }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: string) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Select Seats</h2>
      <div className="grid grid-cols-5 gap-2">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`w-12 h-12 border rounded-lg ${selectedSeats.includes(seat) ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <strong>Selected Seats: </strong> {selectedSeats.join(", ")}
      </div>
    </div>
  );
};

export default SeatSelector;
