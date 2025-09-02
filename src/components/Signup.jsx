import { useState, useContext } from "react";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [searchParams] = useSearchParams();
  const referId = searchParams.get("referId");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    sponsorId: referId || "",
    name: "",
    countryCode: "", // Default to India
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const { signup, otpVerification } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phoneNo ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (formData.phoneNo.length !== 10) {
      toast.error("Phone number must be 10 digits long");
      return;
    }


    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/.test(formData.password)) {
      toast.error("Password must be alphanumeric");
      return;
    }

    if (!formData.countryCode) {
      toast.error("Country code is required");
      return;
    }
    const completeFormData = {
      ...formData,
      phoneNo: `${formData.countryCode}${formData.phoneNo}`,
    };
    const check = await signup(completeFormData);
    if (check) setShowOtpInput(true);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const dataWithOtp = { email: formData?.email, otp };
    const isVerified = await otpVerification(dataWithOtp);
    if (isVerified) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-screen px-4 py-10">
      <form
        onSubmit={showOtpInput ? handleOtpSubmit : handleSubmit}
        className="bg-[#20265d] text-white p-6 md:p-10 rounded-xl w-full md:w-1/2 shadow-lg"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="sponsorId"
              placeholder="Sponsor ID"
              value={formData.sponsorId}
              onChange={handleChange}
              className="p-3 rounded-md bg-white text-black col-span-1 sm:col-span-2"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-white text-black col-span-1 sm:col-span-2"
            />

            {/* Country Code + Phone Number */}
            <div className="flex col-span-1 sm:col-span-2 gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white text-black ${
                  formData.countryCode ? "w-[90px]" : "w-[160px]"
                } `}
                required
              >
                <option defaultChecked value="">
                  <span className="text-gray-500 text-sm">Select Country</span>
                </option>
                <option value="+91" className="">
                  🇮🇳 +91
                </option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+81">🇯🇵 +81</option>
              </select>
              <input
                type="tel"
                name="phoneNo"
                placeholder="Phone Number"
                value={formData.phoneNo}
                onChange={handleChange}
                className="p-3 rounded-md bg-white text-black w-full"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-white text-black col-span-1 sm:col-span-2"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 w-full rounded-md text-black bg-[#fff]"
                required
              />
              <button
                type="button"
                className="absolute h-full text-xl  top-0 right-0 p-3 text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-3 w-full rounded-md text-black bg-[#fff]"
                required
              />
              <button
                type="button"
                className="absolute h-full text-xl  top-0 right-0 p-3 text-black"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
          className="w-full mt-6 bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2"
        >
          {showOtpInput ? "Verify OTP" : "Signup"} <FaArrowRight />
        </button>

        {!showOtpInput && (
          <p className="text-center text-gray-300 mt-4 text-sm">
            Do you have an account?{" "}
            <Link to="/login" className="text-lime-400 hover:underline">
              Login
            </Link>
          </p>
        )}
        <div className="mt-6">
          <div className="flex w-full gap-2 justify-center items-center text-sm font-medium text-white">
            <div className="w-1/3 h-[2px] bg-gradient-to-r from-white  to-transparent rotate-[180deg]"></div>
            Follow Us
            <div className="w-1/3 h-[2px]  bg-gradient-to-r from-white  to-transparent "></div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="facebook.png" alt="Facebook Icon" className="h-8 w-8" />
            </a>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="whatsapp.png" alt="WhatsApp Icon" className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="instagram.png"
                alt="Instagram Icon"
                className="h-8 w-8"
              />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <img src="twitter.png" alt="Instagram Icon" className="h-8 w-8" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
