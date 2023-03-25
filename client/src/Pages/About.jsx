import React, { useEffect } from "react";
import PageBanner from "../Components/PageBanner";
import img from "../assets/about.jpg";

const About = () => {
  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();
  }, []);

  return (
    <div className="About">
      <PageBanner title={"About Us"} />
      <div className="two-content d-flex justify-content-center canvas">
        <div className="content-1 mt-5">
          <p className="font2 highlight">HOW WE WERE FOUNDED</p>
          <h1 className="fw-bold">Easy, fee-free banking for entrepreneurs</h1>
          <p className="fs-6 text-muted mt-2 font2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            <br /> <br />
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure.
          </p>
        </div>
        <div className="content-2 mt-5 ms-5">
          <img
            src={img}
            className="w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
