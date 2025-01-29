import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // Google-style confirmation
      const confirmed = window.confirm(
        `Confirm appointment on ${selectedDate.toLocaleDateString()} at ${selectedTime.toLocaleTimeString()}?`
      );

      if (confirmed) {
        // Simulating Google's booking confirmation
        alert("Demo booked successfully!");
        navigate("/");
      }
    } else {
      alert("Please select date and time");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Book an Appointment for a Demo
        </h1>
        <p className="text-gray-500">Select your preferred date and time</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            minDate={new Date()}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholderText="Choose a date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <DatePicker
            selected={selectedTime}
            onChange={(time: Date) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholderText="Choose a time"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleBookAppointment}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Book demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
