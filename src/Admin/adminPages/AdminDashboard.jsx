import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../AdminContext/AdminContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserGraduate,
  FaUserCheck,
  FaUserTimes,
  FaDollarSign,
  FaMedal,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { getDashboardDetails } = useContext(AdminContext);
  const [dashboardDetails, setDashboardDetails] = useState();

  useEffect(() => {
    const handleGetDashboardDetails = async () => {
      try {
        const dashboardDetails = await getDashboardDetails();
        if (dashboardDetails) {
          setDashboardDetails(dashboardDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetDashboardDetails();
  }, []);

  // Dummy data (replace with real backend-based if available)
  // const chartData = [
  //   { month: "Jan", all: 4, sub: 0, unsub: 4 },
  //   { month: "Mar", all: 1, sub: 0, unsub: 1 },
  //   { month: "Jul", all: 2, sub: 0, unsub: 2 },
  // ];

  return (
    <div className=" h-[90vh] text-white md:p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
      <p className="text-gray-600 text-white mb-6">
        Monitor Users activity and insights.
      </p>

      {/* Admin Info */}
      <div className="bg-[#20265d] rounded-2xl p-6 shadow-lg mb-6 ">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span role="img" aria-label="admin">
            👨‍💼
          </span>{" "}
          Admin Information
        </h2>
        <div className="space-y-3 text-white">
          <div className="flex items-center gap-2">
            <span className="font-medium w-20">Name:</span>
            <span className="truncate">{dashboardDetails?.Name || "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium w-20">Email:</span>
            <span className="truncate">{dashboardDetails?.Email || "—"}</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FaUserGraduate />}
          label="Total Users"
          value={dashboardDetails?.totalUsers}
          color="blue"
        />
        <StatCard
          icon={<FaUserCheck />}
          label="Currently Invested Users"
          value={dashboardDetails?.totalSubscribedUsers}
          color="green"
        />
        <StatCard
          icon={<FaUserTimes />}
          label="Currently Non-Invested Users"
          value={
            (dashboardDetails?.totalUsers || 0) -
            (dashboardDetails?.totalSubscribedUsers || 0)
          }
          color="red"
        />

        <StatCard
          icon={<FaDollarSign />}
          label="Company Turnover"
          value={`$${dashboardDetails?.CompanyTurnOver}`}
          color="teal"
        />
      </div>

      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard
          title="All Students"
          color="#3498db"
          dataKey="all"
          data={chartData}
        />
        <ChartCard
          title="Subscribed Students"
          color="#2ecc71"
          dataKey="sub"
          data={chartData}
        />
        <ChartCard
          title="Unsubscribed Students"
          color="#e74c3c"
          dataKey="unsub"
          data={chartData}
        />
      </div> */}
    </div>
  );
};

// ========== Reusable Chart Card ==========
const ChartCard = ({ title, color, dataKey, data }) => (
  <div className="bg-[#20265d] rounded-xl p-4 shadow-md">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// ========== Reusable Stat Card ==========
const StatCard = ({ icon, label, value, color }) => (
  <div
    className={`bg-[#20265d] p-4 rounded-xl shadow-md border-t-4 border-${color}-500`}
  >
    <div className="flex items-center gap-3">
      <div className={`text-${color}-500 text-2xl`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
