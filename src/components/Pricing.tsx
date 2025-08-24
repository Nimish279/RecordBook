import React, { useState } from "react";
import GetStartedModal from "./pricingmodel";

const Pricing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    color: string;
  } | null>(null);

  // Array of pricing plans with their details.
  const plans = [
    {
      name: "Bronze",
      price: "₹199 / month",
      color: "#cd7f32",
      features: ["1 User Account", "100 Records / Month", "Basic Support"],
    },
    {
      name: "Silver",
      price: "₹499 / month",
      color: "#c0c0c0",
      features: [
        "5 User Accounts",
        "1000 Records / Month",
        "Priority Support",
        "Data Backup",
      ],
    },
    {
      name: "Gold",
      price: "₹999 / month",
      color: "#ffd700",
      features: [
        "10 Users",
        "10000 Records",
        "24/7 Premium Support",
        "Data Backup & Restore",
        "Advanced Reports",
      ],
    },
  ];

  const handleGetStarted = (plan: { name: string; price: string; color: string }) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Our Pricing Plans
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Choose the plan that best suits your business needs.
        </p>
      </div>

      {/* Plans ek line me 3 columns */}
      <div className="grid gap-8 md:grid-cols-3 max-w-screen-xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden w-full max-w-sm mx-auto"
            style={{ borderTop: `6px solid ${plan.color}` }}
          >
            <div className="p-8 text-center flex flex-col h-full">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: plan.color }}
              >
                {plan.name}
              </h2>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">
                {plan.price}
              </p>
              <ul className="text-gray-700 text-base flex-grow space-y-4 text-left">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 border-b border-gray-200 pb-2 last:border-b-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted(plan)}
                className="mt-8 w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <GetStartedModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Pricing;
