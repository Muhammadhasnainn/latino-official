import React, { useEffect } from "react";
import FAQS from "../Components/FAQS";
import Hero from "../Components/Hero";
import HowWorks from "../Components/HowWorks";
import Navbar from "../Components/Navbar";
import WhyUs from "../Components/WhyUs";

const Home = () => {
  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();
  }, []);

  return (
    <>
      <Hero />
      <HowWorks />
      <WhyUs />
      <FAQS />
    </>
  );
};

export default Home;
