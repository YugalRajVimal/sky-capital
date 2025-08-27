import React from "react";

const Message = () => {
  const messages = [
    {
      id: 1,
      from: "Admin",
      subject: "Welcome",
      body: "Welcome to our platform!",
      date: "2025-07-11",
    },
    {
      id: 2,
      from: "Support",
      subject: "Update",
      body: "System maintenance scheduled for tomorrow.",
      date: "2025-07-10",
    },
    {
      id: 3,
      from: "Team",
      subject: "Reminder",
      body: "Please complete your profile to get full access.",
      date: "2025-07-08",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {/* Table Heading */}
        <div className=" px-6 py-3 font-bold text-gray-800 text-lg">
          Message
        </div>

        {/* Table */}
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">SR. No</th>
              <th className="px-4 py-2 border">From</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Message Body</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <tr key={msg.id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{msg.from}</td>
                  <td className="px-4 py-2 border">{msg.subject}</td>
                  <td className="px-4 py-2 border">{msg.body}</td>
                  <td className="px-4 py-2 border">{msg.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 border">
                  No messages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Message;
