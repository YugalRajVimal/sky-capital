const ActivationHistory = () => {
  const history = [
    {
      id: 1,
      userId: "USR001",
      name: "John Doe",
      package: "Basic",
      date: "2025-07-01",
    },
    {
      id: 2,
      userId: "USR002",
      name: "Jane Smith",
      package: "Standard",
      date: "2025-07-02",
    },
    {
      id: 3,
      userId: "USR003",
      name: "Rahul Kumar",
      package: "Premium",
      date: "2025-07-03",
    },
    // Add more records here
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg w-full mx-auto mt-10 overflow-hidden">
      {/* Header */}
      <div className=" px-4 py-3 flex items-center gap-2">
        <h3 className="font-bold text-white text-base sm:text-lg">
          Top-up History
        </h3>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto text-sm sm:text-base min-w-[600px]">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Package</th>
              <th className="px-4 py-2 text-left">Active Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.userId}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.package}</td>
                <td className="px-4 py-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivationHistory;
