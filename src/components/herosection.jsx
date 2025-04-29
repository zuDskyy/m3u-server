import { Link } from "react-router-dom";
import TopGrid from "./grid-top";

const HeroSection = () => {
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  return (
    <section className=" pt-32 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white min-h-[60vh] px-6">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            All Your Channels <br />{" "}
            <span className="text-blue-400">In One Place</span>
          </h1>
          <p className="text-lg text-gray-300">
            Enjoy seamless, stylish and powerful streaming with Z-Player —
            personalized, fast, and beautiful.
          </p>
          <Link to="/tv">
            <button className="bg-blue-600 px-6 py-3 rounded-xl text-white hover:bg-blue-700 transition">
              🚀 Get Started
            </button>
          </Link>
        </div>
        <div>
          <TopGrid assets={ASSETS} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
