```jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="bg-dark min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-primary rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          Sign in to your account
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-white"
            >
              Your Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full p-3 rounded-lg border outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-white"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border outline-none"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="text-gray-300 flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a
              href="#"
              className="text-indigo-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primarySecond hover:bg-indigo-600 text-white py-3 rounded-lg transition"
          >
            Sign In
          </button>

          <p className="text-gray-300 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
```
