import React from "react";

const CustomerLogos = () => {
  const logos = [
    "Microsoft",
    "Google",
    "Netflix",
    "Spotify",
    "Airbnb",
    "Amazon",
  ];

  return (
    <section className="min-h-[30vh] py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex items-center justify-center border rounded-lg p-4 hover:bg-gray-800 transition"
            >
              <span className="text-lg font-semibold text-gray-400 hover:text-white">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;