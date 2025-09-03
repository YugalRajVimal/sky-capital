import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../AdminContext/AdminContext";

const EditUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedEditFormUserId, setSelectedEditFormUserId] = useState();
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  const { getAllUsers, updateUserDetails } = useContext(AdminContext);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
    setSelectedEditFormUserId(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateUserDetails function from AdminContext
      const success = await updateUserDetails(
        selectedEditFormUserId,
        editFormData
      );

      if (success) {
        // If the update was successful, update the state locally
        // Merge the updated fields from editFormData into the existing user object
        setAllUsers((prev) =>
          prev.map((u) =>
            u._id === selectedEditFormUserId ? { ...u, ...editFormData } : u
          )
        );
        setFilteredTeam((prev) =>
          prev.map((u) =>
            u._id === selectedEditFormUserId ? { ...u, ...editFormData } : u
          )
        );

        setEditFormOpen(false); // Close the edit form
      } else {
        // The updateUserDetails function in AdminContext already handles error toasts,
        // so no additional user-facing alert is needed here.
        console.error("Failed to update user via context function.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // This catch block would handle unexpected errors during the execution of handleUpdateSubmit itself,
      // beyond what the context function might catch internally.
    }
  };

  useEffect(() => {
    const handleGetAllUsers = async () => {
      try {
        const users = await getAllUsers();
        if (users) {
          setAllUsers(users);
          setFilteredTeam(users);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers?.filter(
      (entry) =>
        entry?.name?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.email?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.phoneNo?.includes(search)
    );
    setFilteredTeam(filtered);
    setCurrentPage(1); // Reset to page 1 on new search
  }, [search, allUsers]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  const totalEntries = filteredTeam.length;
  const totalPages = Math.ceil(totalEntries / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentData = filteredTeam.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="grow-1 w-full p-3 sm:p-5 rounded-2xl bg-[#030626] shadow-lg h-full overflow-y-auto">
        <h2 className="text-base sm:text-xl font-semibold text-white px-4 py-2 sm:py-3 rounded-t-xl">
          👥 All Users List
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
                setCurrentPage(1); // Reset to page 1 when entry limit changes
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
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.length === 0 ? (
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
                    key={`${user._id}-${index}`}
                    className="hover:bg-gray-50 bg-white"
                  >
                    <td className="p-2">{startIndex + index + 1}</td>
                    <td className="p-2">{user?._id}</td>
                    <td className="p-2">{user?.name || "-"}</td>
                    <td className="p-2">{user?.email || "-"}</td>
                    <td className="p-2">{user?.phoneNo || "-"}</td>

                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          user?.subscribed ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {user?.subscribed ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                        onClick={() => {
                          setEditFormData({
                            name: user?.name || "",
                            email: user?.email || "",
                            phoneNo: user?.phoneNo || "",
                          });
                          setSelectedEditFormUserId(user._id);
                          setEditFormOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-gray-600 gap-2 text-white">
          <div>
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalEntries)} of {totalEntries} entries
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages || totalEntries === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {editFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Edit User Details
            </h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="editName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="editName"
                  name="name"
                  value={editFormData.name}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="editEmail"
                  name="email"
                  value={editFormData.email}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="editPhoneNo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="editPhoneNo"
                  name="phoneNo"
                  value={editFormData.phoneNo}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseEditForm}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUsers;
