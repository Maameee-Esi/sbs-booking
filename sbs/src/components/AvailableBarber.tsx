import React from 'react';

interface Barber {
  id: number;
  name: string;
  specialty: string;
  offDays: string[];
}

interface AvailableBarbersProps {
  barbers: Barber[];
}

const AvailableBarbers: React.FC<AvailableBarbersProps> = ({ barbers }) => {
  const today = new Date().toISOString().split('T')[0];

  const availableBarbers = barbers.filter(
    (barber) => !barber.offDays.includes(today)
  );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Available Barbers Today</h3>
      {availableBarbers.length > 0 ? (
        <ul>
          {availableBarbers.map((barber) => (
            <li key={barber.id}>
              {barber.name} — {barber.specialty}
            </li>
          ))}
        </ul>
      ) : (
        <p>No barbers are available today.</p>
      )}
    </div>
  );
};

export default AvailableBarbers;
