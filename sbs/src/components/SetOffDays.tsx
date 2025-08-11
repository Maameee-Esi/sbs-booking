import React from 'react';

interface Barber {
  id: number;
  name: string;
  specialty: string;
  offDays: string[];
}

interface SetOffDaysProps {
  barbers: Barber[];
  onSetOffDays: (id: number, offDays: string[]) => void;
}

const SetOffDays: React.FC<SetOffDaysProps> = ({ barbers, onSetOffDays }) => {
  const handleDateChange = (barberId: number, date: string) => {
    const barber = barbers.find((b) => b.id === barberId);
    if (!barber) return;

    const hasDate = barber.offDays.includes(date);
    const updatedDays = hasDate
      ? barber.offDays.filter((d) => d !== date)
      : [...barber.offDays, date];

    onSetOffDays(barberId, updatedDays);
  };

  const today = new Date().toISOString().split('T')[0]; // today's date

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Set Off Days</h3>
      {barbers.map((barber) => (
        <div key={barber.id} className="mb-4">
          <p className="font-medium">{barber.name}</p>
          <input
            type="date"
            value={today}
            onChange={(e) => handleDateChange(barber.id, e.target.value)}
            className="border p-1 mr-2"
          />
          <p className="text-sm mt-1">
            Off Days: {barber.offDays.length > 0 ? barber.offDays.join(', ') : 'None'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SetOffDays;
