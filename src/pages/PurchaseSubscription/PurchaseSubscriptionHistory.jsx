import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const PurchaseSubscriptionHistory = () => {
  const { getSendersTransferHistory } = useContext(CustomerContext);
  const [senderTransferHistory, setSenderTransferHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const handleGetSenderTransferHistory = async () => {
      const data = await getSendersTransferHistory();
      setSenderTransferHistory(data || []);
    };

    handleGetSenderTransferHistory();
  }, []);

  const totalItems = senderTransferHistory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = senderTransferHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white max-h-full rounded-xl shadow-lg w-full max-w-6xl mx-auto my-10 overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3">
        <h2 className="text-black font-semibold text-lg">
          Purchase Subscription History
        </h2>
      </div>

      {/* Table Scrollable Wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[600px] table-auto text-sm sm:text-base">
          <thead className="bg-gray-100 font-semibold text-gray-700 text-center">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Plan</th>

              
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center px-4 py-3 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              currentItems.map((item, idx) => (
                <tr key={item._id || idx} className="even:bg-gray-50">
                  <td className="px-4 py-2">{startIndex + idx + 1}</td>
                  <td className="px-4 py-2">
                    {new Date(item?.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{item?.plan}</td>


                  <td className="px-4 py-2">
                    ${Number(item?.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{item?.transactionHash}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 text-sm text-gray-600 mb-6">
        <div>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
          entries
        </div>
        <div className="space-x-2">
          <button
            onClick={handlePrev}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-blue-500 text-blue-600"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-blue-500 text-blue-600"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSubscriptionHistory;
