import React, { useContext, useEffect, useState } from "react";
import ImagePreviewPopup from "../AdminComponents/ImagePreview";
import { AdminContext } from "../AdminContext/AdminContext";

const ApprovedSubscription = () => {
  const [subscriptionRequestList, setSubscriptionRequestList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // ✅ current page
  const [updated, setUpdated] = useState(false);

  const { getAllApprovedSubscriptions, deleteApprovedSubscription } =
    useContext(AdminContext);

  useEffect(() => {
    const handleGetAllSubscriptionRequestList = async () => {
      try {
        const result = await getAllApprovedSubscriptions();
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
    setCurrentPage(1); // ✅ reset page on search
  }, [search]);

  useEffect(() => {
    setCurrentPage(1); // ✅ reset page when entry count changes
  }, [entries]);

  const handleApproveSubscription = async (subscriptionId) => {
    try {
      await deleteApprovedSubscription(subscriptionId);
      setUpdated(!updated);
    } catch (error) {
      console.error("Failed to Delete subscription info", error);
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  const totalPages = Math.ceil(filteredTeam.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const currentData = filteredTeam.slice(startIndex, startIndex + entries);

  return (
    <div className="grow-1 mx-2 sm:mx-5 mt-2 p-3 sm:p-5 rounded-2xl bg-[#030626] shadow-lg h-full overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold text-white px-4 py-2 sm:py-3 rounded-t-xl">
        👥 Subscription Requests
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
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
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Transaction Hash</th>

              <th className="p-3">View Payment</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              currentData.map((user, index) => (
                <tr
                  key={`${user.userId?._id}-${index}`}
                  className="hover:bg-gray-50 bg-white"
                >
                  <td className="p-2">{startIndex + index + 1}</td>
                  <td className="p-2">{user.userId?._id || "-"}</td>
                  <td className="p-2">{user.userId?.name || "-"}</td>
                  <td className="p-2">{user.userId?.email || "-"}</td>
                  <td className="p-2">{user.userId?.phoneNo || "-"}</td>
                  <td className="p-2">{user.hashString || "-"}</td>

                  <td className="p-2">
                    <ImagePreviewPopup src={user?.userId?.screenshotPath} />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleApproveSubscription(user?._id)}
                      className="p-2 bg-red-400 hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-white gap-2 mb-6">
        <div>
          Showing {filteredTeam.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + entries, filteredTeam.length)} of{" "}
          {filteredTeam.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedSubscription;
