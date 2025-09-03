import { useContext, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { CustomerContext } from "../../context/CustomerContext";

const ChangePassword = () => {
  const { changePassword } = useContext(CustomerContext);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleChangePassword = async () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return setError("Please fill all the fields.");
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("New and Confirm Password do not match.");
    }

    if (form.newPassword.length < 8) {
      return setError("Password must be at least 8 characters long");
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/.test(form.newPassword)) {
      return setError("Password must be alphanumeric");
    }

    try {
      await changePassword(form.oldPassword, form.newPassword);

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError("Failed to change password. Try again.");
    }
  };

  return (
    <div className="bg-[#030626] bg-opacity-80 rounded-2xl shadow-2xl max-w-xl mx-auto w-full mt-12 backdrop-blur-lg border  overflow-hidden">
      {/* Header */}
      <div className="  px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
          Change Password
        </h3>
      </div>

      {/* Form */}
      <div className="p-6 space-y-2">
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
          className={`w-fit py-3 px-6 text-white rounded-md font-semibold transition bg-[#9ae600] hover:bg-green-900 `}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="block mb-1 text-white font-semibold text-sm sm:text-base">
      {label}
    </label>
    <input
      type="password"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition  ${
        disabled
          ? "bg-gray-800 border-gray-600 cursor-not-allowed"
          : "bg-gray-900 border-green-900 "
      }`}
    />
  </div>
);

export default ChangePassword;
