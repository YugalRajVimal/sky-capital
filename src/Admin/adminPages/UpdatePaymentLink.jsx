import { useContext, useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

import { AdminContext } from "../AdminContext/AdminContext";

const UpdatePaymentLink = () => {
  const { getPaymentDetails, updatePaymentDetails } = useContext(AdminContext);

  const [form, setForm] = useState({
    paymentLink: "",
    walletQR: null,
  });

  const [oldPaymentLink, setOldPaymentLink] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "walletQR") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    const handleGetOldPaymentLink = async () => {
      try {
        const response = await getPaymentDetails();
        setOldPaymentLink(response.paymentLink);
      } catch (error) {
        console.error("Failed to fetch old payment link:", error);
      }
    };
    handleGetOldPaymentLink();
  }, []);

  const handleUpdatePaymentLink = async () => {
    try {
      const response = await updatePaymentDetails(
        form.paymentLink,
        form.walletQR
      );
      if (response) {
        setSuccess("Payment link and wallet QR updated successfully.");
        setOldPaymentLink(form.paymentLink);
        setForm({
          paymentLink: "",
          walletQR: null,
        });
        setError("");
      } else {
        setError("Failed to update payment link and wallet QR.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error updating payment link and wallet QR:", error);
      setError(
        "An error occurred while updating the payment link and wallet QR."
      );
      setSuccess("");
    }
  };

  return (
    <div className="bg-[#20265d] bg-opacity-80 rounded-2xl shadow-2xl max-w-xl mx-auto w-full mt-12 backdrop-blur-lg   overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between  border-b-[1px] border-t-0 border-x-0 boder-b-white">
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
          Update Payment Link and Wallet QR
        </h3>
      </div>

      {/* Form */}
      <div className="p-6 space-y-5">
        {error && <p className="text-white font-medium text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 font-medium text-sm">{success}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm text-black font-medium">
            Old Payment Link
          </label>
          <input
            type="text"
            name="oldPaymentLink"
            value={oldPaymentLink}
            disabled
            className="w-full px-4 py-2 rounded-md border text-sm text-black placeholder-gray-400 bg-white border-gray-600 cursor-not-allowed"
          />
        </div>

        <Field
          label="New Payment Link"
          name="paymentLink"
          value={form.paymentLink}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="block mb-1 text-sm text-black font-medium">
            Wallet QR
          </label>
          <input
            type="file"
            name="walletQR"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border text-sm text-black placeholder-gray-400 bg-white border-gray-600"
          />
        </div>

        <button
          onClick={handleUpdatePaymentLink}
          className={`w-fit py-3 px-6 text-black rounded-md font-semibold transition bg-white hover:bg-zinc-200 `}
        >
          Update Link and Wallet QR
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="block mb-1 text-sm text-black font-medium">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required
      className={`w-full px-4 py-2 rounded-md border text-sm text-black placeholder-gray-800 transition ${
        disabled
          ? "bg-white border-gray-600 cursor-not-allowed"
          : "bg-zinc-200  focus:outline-none focus:ring-2 focus:ring-red-100"
      }`}
    />
  </div>
);

export default UpdatePaymentLink;
