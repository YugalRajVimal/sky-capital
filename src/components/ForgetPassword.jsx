import { useState, useContext } from "react";
import { FaArrowRight, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const { forgetPassword, signup, otpVerification } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await forgetPassword(formData);
    if (check) setShowOtpInput(true);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const dataWithOtp = { email: formData?.email, otp };
    const isVerified = await otpVerification(dataWithOtp);
    if (isVerified) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-screen  z-50 ">
      <form
        onSubmit={showOtpInput ? handleOtpSubmit : handleSubmit}
        className="bg-[#20265d] w-full h-full text-white p-6 md:p-10 rounded-xl w-full md:w-1/2 shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {showOtpInput ? "Enter OTP" : "Let's Get Started!"}
        </h2>
        <p className="text-center text-gray-300 mb-6">
          {showOtpInput
            ? "Check your phone/email for the OTP code"
            : "Please enter your email address to join us"}
        </p>

        {!showOtpInput ? (
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                name: "email",
                placeholder: "Email",
                required: true,
              },
              {
                name: "newPassword",
                placeholder: "New Password",
                required: true,
              },
            ].map((input, i) => (
              <input
                key={i}
                type={
                  input.name.includes("password")
                    ? "password"
                    : input.name === "email"
                    ? "email"
                    : input.name === "phoneNo"
                    ? "tel"
                    : "text"
                }
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name]}
                onChange={handleChange}
                required={input.required}
                className={`p-3 rounded-md bg-white text-black ${
                  input.full ? "col-span-1 sm:col-span-2" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 w-full bg-white text-black rounded-md"
            required
          />
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-lime-400  hover:bg-lime-500 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2"
        >
          {showOtpInput ? "Verify OTP" : "Reset Password"} <FaArrowRight />
        </button>

        {!showOtpInput && (
          <p className="text-center text-gray-300 mt-4 text-sm">
            Do you have an account?{" "}
            <Link to="/login" className="text-lime-400 hover:underline">
              Login
            </Link>
          </p>
        )}
        <div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="h-8 w-8" />
            </a>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="h-8 w-8" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
