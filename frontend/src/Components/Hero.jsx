import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import hero from "../assets/Hero.jpg";

const Hero = () => {
const { isAuthenticated } = useAuth();

return ( <section className="min-h-[80vh] flex items-center bg-dark"> <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center"> <div> <h1 className="text-5xl font-bold text-white mb-6">
Swift Chat: Instant Connections, Effortless Conversations </h1>

```
      <p className="text-lg text-gray-300 mb-8">
        Connect seamlessly, chat effortlessly, and stay connected
        with friends, family, and teammates using Swift Chat.
      </p>

      <div className="flex gap-4 flex-wrap">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 border border-gray-500 text-white rounded-lg"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            to="/chathome"
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Chat Home
          </Link>
        )}
      </div>
    </div>

    <div>
      <img
        src={hero}
        alt="Swift Chat"
        className="w-full rounded-xl shadow-lg"
      />
    </div>
  </div>
</section>
```

);
};

export default Hero;
