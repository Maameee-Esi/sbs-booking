import React, { useState } from "react";
import AddBarberForm from "../components/AddBarberForm";
import BarberList from "../components/BarberList";
import ServicesTable from "../components/ServiceTable";
import SetOffDays from "../components/SetOffDays";
import AvailableBarbers from "../components/AvailableBarber";
import CustomerManagement from "../components/CustomerManagement"; 

interface Barber {
  id: number;
  name: string;
  specialty: string;
  offDays: string[];
}

interface Service {
  id: number;
  name: string;
  price: number;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const AdminPage: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Haircut", price: 30 },
    { id: 2, name: "Shave", price: 20 },
    { id: 3, name: "Hair Dye", price: 50 },
  ]);
  const [customers, setCustomers] = useState<Customer[]>([]); // ✅

  // Barber methods
  const addBarber = (barber: Omit<Barber, "offDays">) => {
    setBarbers([...barbers, { ...barber, offDays: [] }]);
  };

  const deleteBarber = (id: number) => {
    setBarbers(barbers.filter((barber) => barber.id !== id));
  };

  const setOffDays = (id: number, offDays: string[]) => {
    setBarbers((prev) =>
      prev.map((barber) => (barber.id === id ? { ...barber, offDays } : barber))
    );
  };

  // Service methods
  const editService = (updatedService: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
  };

  // Customer methods ✅
  const addCustomer = (customer: Omit<Customer, "id">) => {
    setCustomers([
      ...customers,
      { ...customer, id: Date.now() }, // quick unique id
    ]);
  };

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Barber Management */}
      <AddBarberForm onAdd={addBarber} />
      <BarberList barbers={barbers} onDelete={deleteBarber} />
      <SetOffDays barbers={barbers} onSetOffDays={setOffDays} />
      <AvailableBarbers barbers={barbers} />

      {/* Service Management */}
      <ServicesTable services={services} onEdit={editService} />

      {/* Customer Management ✅ */}
      <CustomerManagement
        customers={customers}
        onAddCustomer={addCustomer}
        onDeleteCustomer={deleteCustomer}
      />
    </div>
  );
};

export default AdminPage;
