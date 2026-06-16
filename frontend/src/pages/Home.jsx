import Hero from "../Components/Hero";
import LandingNav from "../Components/LandingNav";
import Footer from "../Components/Footer";
import Features from "../Components/Features";
import Payments from "../Components/Payments";
import CustomerLogos from "../Components/CustomerLogos";

const Home = () => {
const { isAuthenticated } = useAuth();

return ( <div className="bg-dark min-h-screen"> <LandingNav /> <Hero /> <Features /> <Payments /> <CustomerLogos /> <Footer /> </div>
);
};

export default Home;
