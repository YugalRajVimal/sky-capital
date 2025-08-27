import React, { useState } from "react";

const FundRequest = () => {
  const [image, setImage] = useState(null);
  const [walletAddress] = useState(
    "0x29b003FaF24eE49556f33486B58805ca18E2816b"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* === Form Section === */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className=" px-4 py-2 font-semibold text-lg">
          Fund Request Form
        </div>

        <div className="p-4 flex flex-col md:flex-row md:items-start gap-6">
          {/* === Form Fields === */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* User ID */}
              <div className="flex items-center border rounded-md bg-gray-200 px-3 py-2">
                <span className="mr-2">👤</span>
                <input
                  className="bg-transparent outline-none w-full"
                  placeholder="GM259207"
                  disabled
                />
              </div>

              {/* User Name */}
              <div className="flex items-center border rounded-md bg-gray-200 px-3 py-2">
                <span className="mr-2">👤</span>
                <input
                  className="bg-transparent outline-none w-full"
                  placeholder="Ayush"
                  disabled
                />
              </div>

              {/* Amount */}
              <div className="flex items-center border rounded-md bg-gray-200 px-3 py-2">
                <span className="mr-2">₹</span>
                <input
                  className="bg-transparent outline-none w-full"
                  placeholder="Amount"
                />
              </div>

              {/* Payment Mode */}
              <div className="flex items-center border rounded-md bg-gray-200 px-3 py-2">
                <span className="mr-2">📄</span>
                <select className="bg-transparent outline-none w-full">
                  <option>Select</option>
                  <option>NEFT</option>
                  <option>UPI</option>
                </select>
              </div>
            </div>

            {/* UTR No */}
            <div className="flex items-center border rounded-md bg-gray-200 px-3 py-2">
              <span className="mr-2">🔁</span>
              <input
                className="bg-transparent outline-none w-full"
                placeholder="UTR No."
              />
            </div>

            {/* File Upload + Preview */}
            <div className="flex items-center gap-3">
              <input type="file" onChange={handleImageChange} />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
            </div>

            {/* Submit */}
            <button className="bg-green-700 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>

          {/* === QR Code === */}
          <div className="w-full md:w-auto text-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletAddress}`}
              alt="QR Code"
              className="mx-auto"
            />
            <p className="text-sm break-all mt-2">{walletAddress}</p>
          </div>
        </div>
      </div>

      {/* === Table Section === */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className=" px-4 py-2 font-semibold text-lg">
          Fund Request List
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] md:w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Images</th>
                <th className="px-4 py-2">Remarks</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan="6">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundRequest;
