import React, { useContext, useEffect, useMemo, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const NonActiveLevelTeam = ({ levelIndex }) => {
  const { getTeamDetails } = useContext(CustomerContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLevelUsers = async () => {
      try {
        const data = await getTeamDetails(1);
        const levelsData = data.unsubscribedUsersByLevel || {};
        const levelUsers = levelsData[levelIndex] || [];
        setUsers(levelUsers);
        setCurrentPage(1); // Reset page on data change
      } catch (error) {
        console.error("Error fetching level team data:", error);
      }
    };

    fetchLevelUsers();
  }, [levelIndex]);

  const filteredUsers = useMemo(() => {
    return users?.filter(
      (user) =>
        (user?.userId?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (user?.userId?.email || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (user?.userId?.phoneNo || "").includes(search)
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / entries);

  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * entries;
    const endIndex = startIndex + entries;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, entries]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="grow-1 w-full h-full mt-2 p-3 sm:p-5 rounded-2xl bg-[#20265d] shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold text-white md:px-6 py-3">
        👥 Level {levelIndex} Users
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 overflow-auto rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1); // Reset to first page on entries change
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
            className="border border-gray-300 text-black rounded px-3 py-1 w-full sm:w-auto text-sm"
            placeholder="Search name, email, or phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-md mb-10">
        <table className="w-full table-auto text-sm text-center border-t">
          <thead className="bg-gray-100 text-gray-700 font-semibold whitespace-nowrap">
            <tr>
              <th className="p-3">S.N.</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              {/* <th className="p-3">Sponsor</th> */}
              {/* <th className="p-3">Joined On</th> */}
              {/* <th className="p-3">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No users in this level
                </td>
              </tr>
            ) : (
              currentUsers.map((u, idx) => (
                <tr
                  key={`${u.userId}-${idx}`}
                  className="hover:bg-gray-50 bg-white text-black"
                >
                  <td className="p-2">
                    {(currentPage - 1) * entries + idx + 1}
                  </td>
                  <td className="p-2">{u.userId?._id || "-"}</td>
                  <td className="p-2">{u.userId?.name || "-"}</td>
                  <td className="p-2">{u.userId?.email || "-"}</td>
                  <td className="p-2">{u.userId?.phoneNo || "-"}</td>
                  {/* <td className="p-2">{u.userId?.sponsorName || "-"}</td> */}
                  {/* <td className="p-2">{formatDate(u.userId?.subscribedOn)}</td> */}
                  {/* <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        u.userId?.subscribed ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {u.userId?.subscribed ? "Active" : "Inactive"}
                    </span>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-white gap-2 mb-6">
        <div>
          Showing{" "}
          {filteredUsers.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{" "}
          {Math.min(currentPage * entries, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonActiveLevelTeam;
