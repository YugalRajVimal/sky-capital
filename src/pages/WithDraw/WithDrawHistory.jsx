import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const WithdrawHistory = () => {
  const { getWithdrawalRequests } = useContext(CustomerContext);
  const [widhrawalRequests, setWidhrawalRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const handleGetWithdrawalRequests = async () => {
      const data = await getWithdrawalRequests();
      setWidhrawalRequests(data || []);
    };

    handleGetWithdrawalRequests();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = widhrawalRequests.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(widhrawalRequests.length / entriesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white max-h-full rounded-xl shadow-lg w-full max-w-6xl mx-auto my-10 overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3">
        <h2 className="text-black font-semibold text-lg">Withdraw History</h2>
      </div>

      {/* Table Scrollable Wrapper */}
      <div className="overflow-x-auto w-full text-center">
        <table className="w-full min-w-[600px] table-auto text-sm sm:text-base">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">S.No</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">
                Withdraw Amount (-5% Platform Fee)
              </th>
              <th className="px-4 py-2 text-center">Wallet Address</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-3 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentEntries.map((item, idx) => (
                <tr key={item.id || idx} className="even:bg-gray-50">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * entriesPerPage + idx + 1}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item?.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    ${Number(item?.requestAmount * 0.95).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{item?.walletAddress}</td>
                  <td
                    className={`px-4 py-2 ${
                      item?.status === "pending"
                        ? "text-yellow-500"
                        : item?.status === "rejected"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item?.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 text-sm text-gray-600 mb-6">
        <div>
          Showing {widhrawalRequests.length === 0 ? 0 : indexOfFirstEntry + 1} to{" "}
          {Math.min(indexOfLastEntry, widhrawalRequests.length)} of{" "}
          {widhrawalRequests.length} entries
        </div>
        <div className="space-x-2">
          <button
            onClick={handlePrevious}
            className={`px-3 py-1 border border-gray-300 rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:bg-gray-200"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`px-3 py-1 border border-gray-300 rounded ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:bg-gray-200"
            }`}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawHistory;
