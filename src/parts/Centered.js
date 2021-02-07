import React from "react";

export default function Centered({ children }) {
  return (
    <section className="h-screen flex justify-center flex-col items-center relative z-50 bg-white">
      <div className="text-lg text-gray-600 mt-4 mb-8 w-full lg:w-8/12 xl:w-6/12 mx-auto text-center">
        {children}
      </div>
    </section>
  );
}
