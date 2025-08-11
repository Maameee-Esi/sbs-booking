import React, { useState } from 'react';

interface Barber {
  id: number;
  name: string;
  specialty: string;
}

interface AddBarberFormProps {
  onAdd: (barber: Barber) => void;
}

const AddBarberForm: React.FC<AddBarberFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !specialty) return;

    const newBarber: Barber = {
      id: Date.now(),
      name,
      specialty,
    };

    onAdd(newBarber);
    setName('');
    setSpecialty('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Add New Barber</h3>
      <input
        type="text"
        placeholder="Barber Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Add</button>
    </form>
  );
};

export default AddBarberForm;
