import React from "react";

const HelpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 ">
      <div className="bg-[#20265d] p-8 rounded-2xl shadow-lg max-w-md text-center p-4">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Need Help?</h1>
        <p className="text-gray-100 mb-6">
          If you’re facing any issues or simply want to talk about something —
          we’re here for you!
        </p>
        <p className="text-gray-100 text-lg font-medium">
          📧 Connect with us at:
        </p>
        <a
          href="mailto:global3xfuture@gmail.com"
          className="mt-2 inline-block text-blue-100 hover:underline text-lg"
        >
          global3xfuture@gmail.com
        </a>
        <p className="text-gray-100 text-lg font-medium mt-4">📞 Call us at:</p>
        <a
          href="tel:+1-202-555-0198"
          className="mt-2 inline-block text-blue-100 hover:underline text-lg"
        >
          +1-202-555-0198
        </a>

        <div className="mt-8 text-sm text-gray-100">
          We usually reply within 24 hours.
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
