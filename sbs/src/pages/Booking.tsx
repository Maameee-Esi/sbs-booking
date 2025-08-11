import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface Service {
  name: string;
  price: number;
}

const services: Service[] = [
  { name: "Haircut", price: 50 },
  { name: "Color dyeing", price: 50 },
  { name: "Washing", price: 50 },
  { name: "Piercing", price: 50 },
];

const Booking: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const publicKey = "your-public-key-here"; // Replace with your Paystack public key
  const amount = selectedService ? selectedService.price * 100 : 0; // pesewas

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); 
    setCustomerName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); 
    setCustomerPhone(value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setTime(""); // reset time when date changes
  };

  
  const getMinMaxTime = () => {
    if (!date) return {};
    const selectedDate = new Date(date);
    const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    if (day === 0) {
      // Sunday
      return { min: "12:00", max: "21:00" };
    } else {
      // Monday - Saturday
      return { min: "09:00", max: "22:00" };
    }
  };

  const componentProps = {
    email: customerEmail,
    amount,
    currency: "GHS",
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "name", value: customerName },
        { display_name: "Phone Number", variable_name: "phone", value: customerPhone },
        { display_name: "Service", variable_name: "service", value: selectedService?.name || "None" },
        { display_name: "Date", variable_name: "date", value: date },
        { display_name: "Time", variable_name: "time", value: time },
      ],
    },
    publicKey,
    text: "Book & Pay Now",
    onSuccess: () => alert("Payment successful! Your booking has been recorded."),
    onClose: () => alert("Payment closed."),
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-barbershop-gray-50">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-center mb-4">Book Your Appointment</h1>
          <p className="text-center text-gray-500 mb-8">
            Secure your spot instantly with online payment.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={handleNameChange}
                  required
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={handlePhoneChange}
                  required
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Select Service</label>
                <select
                  value={selectedService?.name || ""}
                  onChange={(e) =>
                    setSelectedService(services.find((s) => s.name === e.target.value) || null)
                  }
                  required
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                >
                  <option value="">-- Select a Service --</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name} - GHS {service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  min={today}
                  required
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  {...getMinMaxTime()}
                  required
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              {selectedService && (
                <p className="text-lg font-bold">
                  Total: GHS {selectedService.price}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {selectedService && customerEmail && customerName && customerPhone ? (
                  <PaystackButton {...componentProps} className="premium-button flex-1 text-center" />
                ) : (
                  <button disabled className="premium-button flex-1 opacity-50 cursor-not-allowed">
                    Pay
                  </button>
                )}

                <Link to="/" className="premium-button-outline flex-1 text-center">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;

