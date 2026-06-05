import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await axios.post(
        "/api/user/register",
        data
      );

      toast.success(res.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="bg-dark min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-primary rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full p-3 rounded"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              className="p-3 rounded"
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
              className="p-3 rounded"
              required
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded"
          >
            Create Account
          </button>

          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;