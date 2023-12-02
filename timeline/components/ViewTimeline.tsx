import React from "react";

export default function ViewTimeline() {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      <li className="mb-10 ml-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          February 20, 2024
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Revamped Hub
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Revamped hub (in mobile app and webapp) to engage with your
          subscriptions and their associated apps. Users can access apps in
          fewer clicks, request more from creators, and manage notifications
          easily. Version 3.1.
        </p>
      </li>
      <li className="mb-10 ml-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          March 15, 2024
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          New Seller Dashboard
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Rebuilt seller dashboard on the primary whop.com domain. Aiming for a
          more seamless experience to encourage users to become sellers. Version
          3.2.
        </p>
      </li>
      <li className="mb-10 ml-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          June 30, 2024
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          App Components
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Introduction of app components to drastically reduce production time
          and enhance interoperability in the app ecosystem. Version 4.0.
        </p>
      </li>
      <li className="ml-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          June 30, 2024
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          All New Product Pages
        </h3>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Launch of more engaging product pages, offering insights into the
          products and helping consumers discover similar items. Version 4.0.
        </p>
      </li>
    </ol>
  );
}
