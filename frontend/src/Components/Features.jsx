```jsx
import React from "react";

const features = [
  {
    title: "Marketing",
    description:
      "Plan it, create it, launch it. Collaborate seamlessly with your team and hit your marketing goals every month.",
  },
  {
    title: "Legal",
    description:
      "Protect your organization and stay compliant with structured workflows and custom permissions.",
  },
  {
    title: "Business Automation",
    description:
      "Auto-assign tasks, send notifications, and streamline your workflows with powerful automation.",
  },
  {
    title: "Finance",
    description:
      "Audit-proof software built for critical financial operations, budgeting, and reporting.",
  },
  {
    title: "Enterprise Design",
    description:
      "Craft beautiful experiences for your customers with real cross-company collaboration.",
  },
  {
    title: "Operations",
    description:
      "Keep your company running efficiently with customizable workflows and team collaboration.",
  },
];

const Features = () => {
  return (
    <section className="bg-background">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Designed for business teams like yours
          </h2>

          <p className="text-gray-400 sm:text-xl">
            Here at Swift Chat we focus on communication,
            collaboration, and productivity that helps teams grow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-primary hover:bg-primary/80 transition"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primarySecond">
                <span className="text-white font-bold">
                  {feature.title.charAt(0)}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
```
