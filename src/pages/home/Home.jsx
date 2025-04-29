import React, { useState } from "react";
import { Link } from "react-router-dom";

import AboutSection from "../../components/aboutsection";
import ContactForm from "../../components/contactform";
import Footer from "../../components/Footer";
import BottomGrid from "../../components/grid-bottom";
import TopGrid from "../../components/grid-top";
import Navbar from "../../components/navbar";
import TvChannelSlider from "../../components/tvchannelslider";
import "../../styles/home.css";

const Home = () => {
  const [activeItem, setActiveItem] = useState(false);
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  const handleItemClick = () => {
    setActiveItem(true);
  };

  return (
    <div className=" ">
      <Navbar />
      {/* <HeroSection /> */}
      <div className="container mx-auto py-20">
        <div className="flex flex-col-reverse md:flex-row p-10 top-10">
          <BottomGrid assets={ASSETS} />
          <div className="middleBottomContent">
            <h3
              style={{
                color: "white",
                fontSize: "22px",
                fontWeight: 300,
                wordWrap: "break-word",
                width: "100%",
              }}
            >
              You will be able to add an unlimited number of Channel lists and
              Save your list every time{" "}
            </h3>
            <Link to="/tv">
              <button> Upload and Enjoy </button>
            </Link>
          </div>
        </div>
        <TvChannelSlider assets={ASSETS} />
        <div className="tvM3uInfo"></div>
        <AboutSection />
        <TopGrid assets={ASSETS} />
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
