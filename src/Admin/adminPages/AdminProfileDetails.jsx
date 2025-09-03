import React, { useContext, useEffect, useState } from "react";
import ImagePreviewPopup from "../AdminComponents/ImagePreview";
import { AdminContext } from "../AdminContext/AdminContext";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdmindashboardDetails = () => {
  const { getDashboardDetails } = useContext(AdminContext);
  const [dashboardDetails, setDashboardDetails] = useState();

  useEffect(() => {
    const handleGetDashboardDetails = async () => {
      try {
        const dashboardDetails = await getDashboardDetails();
        if (dashboardDetails) {
          // Handle the dashboard details here
          console.log(dashboardDetails);
          setDashboardDetails(dashboardDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetDashboardDetails();
  }, []);

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
    <div className="h-[90vh] flex flex-col w-full  flex justify-start items-start py-10 px-16 rounded-2xl overflow-y-scroll">
      {/* <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg h-[80vh] overflow-x-auto">

        <div className="bg-gradient-to-r from-[#08464c] to-green-900 p-6 text-white flex items-center gap-4 rounded-t-2xl">
          <FaUserCircle className="text-5xl" />
          <div>
            <h2 className="text-2xl font-semibold">
              {dashboardDetails?.Name || "Loading..."}
            </h2>
            <p className="text-sm opacity-80">{dashboardDetails?.Email}</p>
          </div>
        </div>
      </div> */}
      <div className="w-full h-fit  my-4 rounded-md">
        <div className="max-w-xl text-left  p-6 bg-[#030626] rounded-md">
          <h2 className="text-2xl font-semibold text-white mb-1">
            Profile Information
          </h2>
          {/* <p className="text-gray-500 mb-6">
            Update your account's profile information and email address.
          </p> */}
          <form className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={dashboardDetails?.Name}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={dashboardDetails?.Email}
                disabled
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-fit  shadow shadow-md bg-[#030626]  my-4 rounded-md">
        {/* Header */}
        <div className="max-w-xl text-left  p-6 bg-[#030626] rounded-md">
          <h2 className="text-2xl font-semibold text-white mb-1">
            Reset Password
          </h2>
        </div>

        {/* Form */}
        <div className="px-6 py-2 space-y-5 mb-6">
          {error && <p className="text-white font-medium text-sm">{error}</p>}
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
            className={` w-fit py-3 px-6 text-white rounded-md font-semibold transition bg-blue-600 hover:bg-blue-700 `}
          >
            Reset Password
          </button>
        </div>
      </div>
      <div className="w-full h-fit my-4 rounded-md">
        <Link
          to="/admin/logout"
          className={` w-fit py-3 px-6 text-white rounded-md font-semibold transition bg-red-600 hover:bg-red-700 `}
        >
          LogOut
        </Link>
      </div>
    </div>
  );
};

const Field = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="block mb-1 text-sm text-black font-medium">{label}</label>
    <input
      type="password"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2  rounded-md focus:outline-none border border-[1px] border-white text-black focus:ring-2 focus:ring-green-900 ${
        disabled
          ? "bg-gray-100  cursor-not-allowed"
          : "bg-gray-200 focus:outline-none"
      }`}
    />
  </div>
);

export default AdmindashboardDetails;
