import React, { useContext, useEffect, useState } from "react";
import ImagePreviewPopup from "../AdminComponents/ImagePreview";
import { AdminContext } from "../AdminContext/AdminContext";

const ApprovedWidhraw = () => {
  const [subscriptionRequestList, setSubscriptionRequestList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [entries, setEntries] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [updated, setUpdated] = useState(false);

  const { getPendingWithdrawRequest, approvePendingWithdrawRequest } =
    useContext(AdminContext);

  useEffect(() => {
    const handleGetAllSubscriptionRequestList = async () => {
      try {
        const result = await getPendingWithdrawRequest();
        if (result) {
          setSubscriptionRequestList(result);
          setFilteredTeam(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAllSubscriptionRequestList();
  }, [updated]);

  useEffect(() => {
    const filtered = subscriptionRequestList?.filter(
      (entry) =>
        entry?.name?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.email?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.phoneNo?.includes(search)
    );
    setFilteredTeam(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [search]);

  const handleApproveSubscription = async (requestId, action) => {
    try {
      await approvePendingWithdrawRequest(requestId, action);
      setUpdated(!updated); // toggle to re-fetch
    } catch (error) {
      console.error("Failed to approve subscription:", error);
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  const indexOfLast = currentPage * entries;
  const indexOfFirst = indexOfLast - entries;
  const currentEntries = filteredTeam.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTeam.length / entries);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="grow-1 mx-2 sm:mx-5 mt-2 p-3 sm:p-5 rounded-2xl bg-[#20265d] shadow-lg h-full overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold text-white px-4 py-2 sm:py-3 rounded-t-xl">
        👥 Withdraw Requests
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1); // Reset to first page on change
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm font-medium text-gray-700">entries</span>
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mr-2">
            Search:
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-1 w-full sm:w-auto text-sm"
            placeholder="Search name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-md">
        <table className="min-w-[900px] w-full table-auto text-sm text-center border-t">
          <thead className="bg-gray-100 text-gray-700 font-semibold whitespace-nowrap">
            <tr>
              <th className="p-3">S.N.</th>
              <th className="p-3">Date</th>
              <th className="p-3">User ID & Name</th>
              <th className="p-3">Contact Info</th>
              <th className="p-3">Requested Amount - 5%</th>
              <th className="p-3">Wallet Type</th>
              <th className="p-3">Wallet Address</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              currentEntries.map((entry, index) => {
                const user = entry;
                return (
                  <tr
                    key={`${entry.userId}-${index}`}
                    className="hover:bg-gray-50 bg-white"
                  >
                    <td className="p-2">{indexOfFirst + index + 1}</td>
                    <td className="p-2">{formatDate(entry?.date)}</td>
                    <td className="p-2">
                      <div>
                        <span>{entry?.userId?._id || "-"}</span>
                        <br />
                        <span>{user?.userId?.name || "-"}</span>
                      </div>
                    </td>
                    <td className="p-2 ">
                      <div>
                        <span>{user?.userId?.email || "-"}</span>
                        <br />
                        <span>{user?.userId?.phoneNo || "-"}</span>
                      </div>
                    </td>

                    <td className="p-2">
                      $
                      {(user?.requestAmount
                        ? parseFloat(user.requestAmount) * 0.95
                        : "-"
                      ).toFixed(2)}
                    </td>
                    <td className="p-3">
                      {user?.walletType === "main"
                        ? "Main Wallet"
                        : user?.walletType === "roi"
                        ? "ROI Wallet"
                        : "-"}
                    </td>

                    <td className="p-2">
                      <span>{user?.walletAddress || "-"}</span>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(
                            user?.walletAddress || ""
                          )
                        }
                        className="ml-2 p-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                      >
                        Copy
                      </button>
                    </td>
                    <td className="p-2 flex flex-col justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          handleApproveSubscription(user?._id, "reject")
                        }
                        className="p-2 bg-red-400 hover:bg-red-500"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleApproveSubscription(user?._id, "approve")
                        }
                        className="p-2 bg-green-400 hover:bg-green-500"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-white gap-2 mb-6">
        <div>
          Showing {filteredTeam.length === 0 ? 0 : indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredTeam.length)} of {filteredTeam.length}{" "}
          entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedWidhraw;
