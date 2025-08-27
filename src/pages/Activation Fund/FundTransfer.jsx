import React from "react";

const FundTransfer = () => {
  const data = []; // Replace with actual fund transfer data

  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl mx-auto mt-10 overflow-hidden">
      {/* Header */}
      <div className=" px-4 py-3">
        <h2 className="text-black font-semibold text-lg">Fund Transfer</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[600px] table-auto text-sm sm:text-base">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">To</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-3 text-gray-500">
                  No fund transfer records.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.to}</td>
                  <td className="px-4 py-2">₹{item.amount}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 text-sm text-gray-600">
        <div>
          Showing {data.length === 0 ? 0 : 1} to {data.length} of {data.length}{" "}
          entries
        </div>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
            disabled
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;
