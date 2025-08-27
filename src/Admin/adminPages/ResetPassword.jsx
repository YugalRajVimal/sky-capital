import { useContext, useState } from "react";
import { AdminContext } from "../AdminContext/AdminContext";

const ResetPassword = () => {
  const { changePassword } = useContext(AdminContext);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleChangePassword = async () => {
    if (!form.newPassword || !form.confirmPassword || !form.oldPassword) {
      return setError("Please fill all the fields.");
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("New and Confirm Password do not match.");
    }

    const success = await changePassword(form.oldPassword, form.newPassword);
    if (success) {
      setSuccess("Password changed successfully");
    } else {
      setError("Failed to change password");
    }
  };

  return (
    <div className="bg-[#0f172a] bg-opacity-80 rounded-2xl shadow-2xl max-w-xl mx-auto w-full mt-12 backdrop-blur-lg border  overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
          Reset Password
        </h3>
      </div>

      {/* Form */}
      <div className="p-6 space-y-5">
        {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 font-medium text-sm">{success}</p>
        )}

        <Field
          label="Old Password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
        />
        <Field
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />
        <Field
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          onClick={handleChangePassword}
          className={`w-full py-3 text-white rounded-md font-semibold transition bg-blue-600 hover:bg-blue-700 `}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-200 font-medium">
      {label}
    </label>
    <input
      type="password"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-md border text-sm text-white placeholder-gray-400 transition ${
        disabled
          ? "bg-gray-800 border-gray-600 cursor-not-allowed"
          : "bg-gray-900 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }`}
    />
  </div>
);

export default ResetPassword;
