import React from 'react';

interface Barber {
  id: number;
  name: string;
  specialty: string;
}

interface BarberListProps {
  barbers: Barber[];
  onDelete: (id: number) => void;
}

const BarberList: React.FC<BarberListProps> = ({ barbers, onDelete }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Current Barbers</h3>
      <ul>
        {barbers.map((barber) => (
          <li key={barber.id} className="mb-2 flex justify-between">
            <span>{barber.name} — {barber.specialty}</span>
            <button
              onClick={() => onDelete(barber.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarberList;
