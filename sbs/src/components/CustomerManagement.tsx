import React, { useState } from "react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Props {
  customers: Customer[];
  onAddCustomer: (customer: Omit<Customer, "id">) => void;
  onDeleteCustomer: (id: number) => void;
}

const CustomerManagement: React.FC<Props> = ({
  customers,
  onAddCustomer,
  onDeleteCustomer,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCustomer({ name, phone, email });
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Customer Management</h2>

      {/* Add Customer Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          className="border p-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Customer
        </button>
      </form>

      {/* Customers List */}
      <ul className="mt-4">
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-gray-600">
                {customer.phone} | {customer.email}
              </p>
            </div>
            <button
              onClick={() => onDeleteCustomer(customer.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerManagement;
