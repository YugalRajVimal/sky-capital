import { useContext, useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../../AdminContext/AdminAuthContext.jsx";
const AdLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AdminAuthContext);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Logging in with:", credentials);
    const checkLogin = await login(credentials);
    if (checkLogin) {
      navigate("/admin");
    } else {
    }
    // simulate login
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-screen px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#20265d] text-white p-6 md:p-10 rounded-xl  w-full md:w-1/2 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Admin!</h2>
        <p className="text-center text-gray-300 mb-6">Login to Admin Panel</p>

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
            className="mt-2  bg-lime-400  hover:bg-lime-500 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2"
          >
            Login <FaArrowRight />
          </button>

          <Link
            to="/admin/forget-password"
            className="text-center mt-4 text-lime-400 cursor-pointer hover:underline"
          >
            Forget password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdLogin;
