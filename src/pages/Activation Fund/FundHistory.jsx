import React from "react";

const FundHistory = () => {
  const data = []; // Replace with real data

  return (
    <div className="bg-[#050a1e] rounded-xl shadow-lg w-full max-w-6xl mx-auto mt-10 overflow-hidden">
      {/* Header */}
      <div className=" px-4 py-3">
        <h2 className="text-black font-semibold text-lg">My Fund</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[600px] table-auto text-sm sm:text-base">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">S. No.</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Remarks</th>
              <th className="px-4 py-2 text-left">From</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-3 text-gray-500">
                  No fund history available.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">₹{item.amount}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.remarks}</td>
                  <td className="px-4 py-2">{item.from}</td>
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

export default FundHistory;
