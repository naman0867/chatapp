import React from "react";

const Payments = () => {
  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div className="mx-auto max-w-screen-md text-center mb-8">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
          Designed for business teams like yours
        </h2>

        <p className="mb-5 text-gray-400 sm:text-xl">
          Here at Swift we focus on markets where technology and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Starter */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow">
          <h3 className="mb-4 text-2xl font-semibold">Starter</h3>

          <p className="text-gray-400">
            Best option for personal use and your next project.
          </p>

          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$29</span>
            <span className="text-gray-400">/month</span>
          </div>

          <ul className="mb-8 space-y-4 text-left">
            <li>✓ Individual configuration</li>
            <li>✓ No setup or hidden fees</li>
            <li>✓ Team size: 1 developer</li>
            <li>✓ Premium support: 6 months</li>
            <li>✓ Free updates: 6 months</li>
          </ul>

          <button className="bg-blue-600 text-white py-2 rounded">
            Get Started
          </button>
        </div>

        {/* Company */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow">
          <h3 className="mb-4 text-2xl font-semibold">Company</h3>

          <p className="text-gray-400">
            Relevant for multiple users with premium support.
          </p>

          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$99</span>
            <span className="text-gray-400">/month</span>
          </div>

          <ul className="mb-8 space-y-4 text-left">
            <li>✓ Individual configuration</li>
            <li>✓ No setup or hidden fees</li>
            <li>✓ Team size: 10 developers</li>
            <li>✓ Premium support: 24 months</li>
            <li>✓ Free updates: 24 months</li>
          </ul>

          <button className="bg-blue-600 text-white py-2 rounded">
            Get Started
          </button>
        </div>

        {/* Enterprise */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow">
          <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>

          <p className="text-gray-400">
            Best for large-scale use and extended redistribution.
          </p>

          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$499</span>
            <span className="text-gray-400">/month</span>
          </div>

          <ul className="mb-8 space-y-4 text-left">
            <li>✓ Individual configuration</li>
            <li>✓ No setup or hidden fees</li>
            <li>✓ Team size: 100+ developers</li>
            <li>✓ Premium support: 36 months</li>
            <li>✓ Free updates: 36 months</li>
          </ul>

          <button className="bg-blue-600 text-white py-2 rounded">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payments;