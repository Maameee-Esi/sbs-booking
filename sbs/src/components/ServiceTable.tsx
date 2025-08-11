import React, { useState } from 'react';

interface Service {
  id: number;
  name: string;
  price: number;
}

interface ServicesTableProps {
  services: Service[];
  onEdit: (updatedService: Service) => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({ services, onEdit }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [priceInput, setPriceInput] = useState<number>(0);

  const handleEditClick = (service: Service) => {
    setEditingId(service.id);
    setPriceInput(service.price);
  };

  const handleSaveClick = (service: Service) => {
    onEdit({ ...service, price: priceInput });
    setEditingId(null);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Services</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Service</th>
            <th className="p-2">Price (GHS)</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="p-2">{service.name}</td>
              <td className="p-2">
                {editingId === service.id ? (
                  <input
                    type="number"
                    value={priceInput}
                    onChange={(e) => setPriceInput(Number(e.target.value))}
                    className="border p-1 w-24"
                  />
                ) : (
                  `GHS ${service.price}`
                )}
              </td>
              <td className="p-2">
                {editingId === service.id ? (
                  <button
                    onClick={() => handleSaveClick(service)}
                    className="text-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(service)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;
