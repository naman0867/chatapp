import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `/api/user/${id}/verify/${token}`
        );

        toast.success(response.data.message);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [id, token]);

  return (
    <div className="bg-dark min-h-screen flex items-center justify-center text-white">
      {loading ? (
        <h2>Verifying Email...</h2>
      ) : (
        <div className="text-center">
          <h2>Email Verification Complete</h2>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="mt-4 inline-block px-4 py-2 bg-primarySecond rounded"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;