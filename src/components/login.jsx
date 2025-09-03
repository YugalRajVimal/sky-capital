import { useContext, useState } from "react";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Logging in with:", credentials);
    const checkLogin = await login(credentials);
    if (checkLogin) {
      navigate("/");
    } else {
    }
    // simulate login
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-screen px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#030626] text-white p-6 md:p-10 rounded-xl  w-full md:w-1/2 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-300 mb-6">
          Login to your account and join us
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="User"
            value={credentials.username}
            onChange={handleChange}
            className="p-3 rounded-md text-black bg-[#fff]"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
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

          <button
            type="submit"
            className="mt-2 bg-lime-400  hover:bg-lime-500 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2"
          >
            Login <FaArrowRight />
          </button>

          <Link
            to="/forget-password"
            className="text-center mt-4 text-lime-400 cursor-pointer hover:underline"
          >
            Forget password
          </Link>

          <p className="text-center text-gray-300 mt-2">
            Do'nt have an account?{" "}
            <span
              className="text-lime-400 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </p>
        </div>
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

export default Login;
