import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../AdminContext/AdminContext";
import { toast } from "react-toastify";

const RoyaltyAchieversMain = () => {
  const [allWeekRoyaltyAchievers, setAllWeekRoyaltyAchievers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [entries, setEntries] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [companyTurnover, setCompanyTurnover] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    getRoyaltyAchieversMain,
    getTenDaysCompanyTurnover,
    payRoyaltyAchiever,
  } = useContext(AdminContext);

  const totalPages = Math.ceil(filteredTeam.length / entries);

  useEffect(() => {
    const today = new Date();
    const start = new Date("2025-01-01");
    const end = today;

    setFromDate(start.toISOString().split("T")[0]);
    setToDate(end.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const achieversData = await getRoyaltyAchieversMain(fromDate, toDate);
        if (Array.isArray(achieversData.filteredRoyaltyAchievers)) {
          setAllWeekRoyaltyAchievers(achieversData.filteredRoyaltyAchievers);
          setFilteredTeam(achieversData.filteredRoyaltyAchievers);
        } else {
          setAllWeekRoyaltyAchievers([]);
          setFilteredTeam([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCompanyTurnover = async () => {
      try {
        const companyTurnoverData = await getTenDaysCompanyTurnover(
          fromDate,
          toDate
        );
        if (companyTurnoverData) {
          setCompanyTurnover(companyTurnoverData.totalTurnover);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (fromDate && toDate) {
      fetchCompanyTurnover();
      fetchAchievers();
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    const filtered = allWeekRoyaltyAchievers?.filter((entry) => {
      return (
        entry?.name?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.email?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.phoneNo?.includes(search)
      );
    });
    setFilteredTeam(filtered);
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);

  const handleFromDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setFromDate(e.target.value);

    const endDate = new Date(selectedDate);
    endDate.setDate(selectedDate.getDate() + 10);
    setToDate(endDate.toISOString().split("T")[0]);
  };

  const handlePayRoyaltyAchiever = async (user) => {
    const dateDiff = Math.abs(new Date(toDate) - new Date(fromDate));
    const diffDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
    if (diffDays > 10) {
      toast.error(
        "Payment can only be made when fromDate is Selected is 10 days."
      );
      return;
    }

    const per = user?.royaltyType === "week" ? 0.02 : 0.03;
    const tReward = companyTurnover * per;
    const reward =
      tReward /
      (user?.royaltyType === "week"
        ? filteredTeam.filter((team) => team.royaltyType === "week").length
        : filteredTeam.filter((team) => team.royaltyType === "tenDays").length);

    const result = await payRoyaltyAchiever(user._id, reward);

    console.log(reward);
    if (result) {
      toast.success("Payment successful.");
    } else {
      toast.error("Payment failed.");
    }
  };

  const paginatedData = filteredTeam.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  return (
    <div className=" p-3 sm:p-5 rounded-2xl bg-[#030626] shadow-lg h-full overflow-y-auto">
      <div className="flex justify-between">
        <h2 className="text-base sm:text-xl font-semibold text-white px-4 py-2 sm:py-3">
          👥 Royalty Achiever List
        </h2>
        <div className="text-white">
          <h3 className="text-lg font-semibold">Company Turnover</h3>
          <p className="text-sm">Total Turnover: ${companyTurnover}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm font-medium text-gray-700">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            From Date:
          </label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={fromDate}
            onChange={handleFromDateChange}
          />
          <label className="text-sm font-medium text-gray-700">To Date:</label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={toDate}
            readOnly
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mr-2">
            Search:
          </label>
          <input
            type="text"
            className="border rounded px-3 py-1 w-full sm:w-auto text-sm"
            placeholder="Search name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-md">
        <table className="min-w-[900px] w-full table-auto text-sm text-center border-t">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">S.N.</th>
              <th className="p-3">From Date</th>
              <th className="p-3">User ID & Name</th>
              <th className="p-3">Email & Phone</th>
              <th className="p-3">Network Type and Wallet Address</th>
              <th className="p-3">Royalty Type</th>
              <th className="p-3">Sponsor ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reward</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((user, index) => (
                <tr
                  key={`${user.userId?._id}-${index}`}
                  className="hover:bg-gray-50 bg-white"
                >
                  <td className="p-2">
                    {(currentPage - 1) * entries + index + 1}
                  </td>
                  <td className="p-2">
                    {new Date(user.dateFrom).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {user.userId?._id}
                    <br />
                    {user?.userId?.name || "-"}
                  </td>
                  <td className="p-2">
                    {user?.userId?.email || "-"} <br />
                    {user?.userId?.phoneNo || "-"}
                  </td>
                  <td className="p-2">
                    {user?.userId?.bankId || "-"} <br />
                    {user?.userId?.idType || "-"}
                  </td>
                  <td className="p-2">
                    {user?.royaltyType === "week"
                      ? "Weekly"
                      : user?.royaltyType === "tenDays"
                      ? "Ten Days"
                      : "-"}
                  </td>
                  <td className="p-2">{user?.userId?.sponsorId || "-"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        user?.status === "paid" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user?.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="p-2">
                    {filteredTeam.length > 0
                      ? parseFloat(
                          (companyTurnover *
                            (user?.royaltyType === "week" ? 0.02 : 0.03)) /
                            (user?.royaltyType === "week"
                              ? filteredTeam.filter(
                                  (team) => team.royaltyType === "week"
                                ).length
                              : filteredTeam.filter(
                                  (team) => team.royaltyType === "tenDays"
                                ).length)
                        ).toFixed(2)
                      : "-"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handlePayRoyaltyAchiever(user)}
                      className="px-3 py-1 border rounded bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Set Status Paid
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-white gap-2 mb-6">
        <div>
          Showing{" "}
          {filteredTeam.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{" "}
          {Math.min(currentPage * entries, filteredTeam.length)} of{" "}
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

export default RoyaltyAchieversMain;
