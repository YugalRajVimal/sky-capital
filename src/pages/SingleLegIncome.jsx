const SingleLegIncome = () => {
  const summary = { direct: 0, team: 0 };

  const data = [
    { team: 25, direct: "", income: "25 X 65 Days", abc: "", status: "--" },
    { team: 120, direct: 2, income: "42 X 65 Days", abc: "", status: "--" },
    { team: 450, direct: 4, income: "84 X 65 Days", abc: "", status: "--" },
    { team: 1425, direct: 4, income: "125 X 65 Days", abc: "", status: "--" },
    { team: 2150, direct: 5, income: "210 X 65 Days", abc: "", status: "--" },
    {
      team: 3175,
      direct: 6,
      income: "345 X 65 Days",
      abc: "1 I'd Daily Group TEAM Se",
      status: "--",
    },
    {
      team: 5500,
      direct: 7,
      income: "850 X 65 Days",
      abc: "3 I'd Daily Group TEAM Se",
      status: "--",
    },
    {
      team: 6802,
      direct: 8,
      income: "1890 X 65 Days",
      abc: "5 I'd Daily Group TEAM Se",
      status: "--",
    },
    {
      team: 15200,
      direct: 9,
      income: "4235 X 65 Days",
      abc: "10 I'd Daily Group TEAM Se",
      status: "--",
    },
    {
      team: 18440,
      direct: 10,
      income: "8870 X 65 Days",
      abc: "15 I'd Daily Group TEAM Se",
      status: "--",
    },
    {
      team: 35500,
      direct: 20,
      income: "18740 X 65 Days",
      abc: "20 I'd Daily Group TEAM Se",
      status: "--",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full mx-auto mt-8 px-3">
      {/* Header */}
      <div className=" px-4 py-3 flex justify-between items-center">
        <h2 className="font-semibold text-lg text-black">Single Leg</h2>
        <p className="text-sm text-black">
          Direct: {summary.direct}, Team: {summary.team}
        </p>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="text-left px-4 py-2">Team</th>
              <th className="text-left px-4 py-2">Direct</th>
              <th className="text-left px-4 py-2">Income</th>
              <th className="text-left px-4 py-2">A:B:C</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2">{row.team}</td>
                <td className="px-4 py-2">{row.direct}</td>
                <td className="px-4 py-2">{row.income}</td>
                <td className="px-4 py-2">{row.abc}</td>
                <td className="px-4 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleLegIncome;
