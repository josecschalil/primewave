"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    topic: "",
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            CONTACT US
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            For all Tathva-related enquiries, our team is just a message away.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center border-t border-gray-200 pt-2">
            <label className="text-sm font-medium text-gray-900 md:w-1/2 mb-2 md:mb-0">
              TOPIC
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="ENTER TOPIC"
              className="md:w-1/2 px-4 py-5 text-gray-600 placeholder-gray-300 border-0 focus:outline-none focus:ring-0 text-xl"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center border-t border-gray-200 pt-2">
            <label className="text-sm font-medium text-gray-900 md:w-1/2 mb-2 md:mb-0">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="FULL NAME"
              className="md:w-1/2 px-4 py-5 text-gray-600 placeholder-gray-300 border-0 focus:outline-none focus:ring-0 text-xl"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center border-t border-gray-200 pt-2">
            <label className="text-sm font-medium text-gray-900 md:w-1/2 mb-2 md:mb-0">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@example.com"
              className="md:w-1/2 px-4 py-5 text-gray-600 placeholder-gray-300 border-0 focus:outline-none focus:ring-0 text-xl"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center border-t border-gray-200 pt-2">
            <label className="text-sm font-medium text-gray-900 md:w-1/2 mb-2 md:mb-0">
              PHONE
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className="md:w-1/2 px-4 py-5 text-gray-600 placeholder-gray-300 border-0 focus:outline-none focus:ring-0 text-xl"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-start border-t border-gray-200 pt-2">
            <label className="text-sm font-medium text-gray-900 md:w-1/2 mb-2 md:mb-0 md:pt-1">
              QUERY
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="ENTER DETAILS"
              rows="6"
              className="md:w-1/2 px-4 py-5 text-gray-600 placeholder-gray-300 border-0 focus:outline-none focus:ring-0 text-xl resize-none"
            />
          </div>

          <div className="flex justify-end pt-8">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 text-gray-800 text-xl md:text-2xl font-serif hover:gap-4 transition-all duration-300 cursor-pointer"
            >
              SUBMIT
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
