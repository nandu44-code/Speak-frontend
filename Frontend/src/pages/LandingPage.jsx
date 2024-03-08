import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";
import { BiWorld } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa6";
import { TbSettingsCog } from "react-icons/tb";


function LandingPage() {
  return (
    <div>
      <Navbar />
      <Header />
        <div className="flex flex-row md:flex-row m-4 justify-evenly">
          <FeatureCard
            icon={<BiWorld color="blue" />}
            heading="Learn English online anytime, anywhere"
            paragraph="We provide an immersive virtual classroom experience that is both engaging and effective. Our interactive sessions ensure that you get the most out of every lesson."
          />
          <FeatureCard
            icon={<FaCommentDots color="orange" />}
            heading="Live conversation with native English speakers"
            paragraph="We provide an immersive virtual classroom experience that is both engaging and effective. Our interactive sessions ensure that you get the most out of every lesson."
          />
          <FeatureCard
            icon={<TbSettingsCog color="red" />}
            heading="Classes matched to your learning goals"
            paragraph="Enjoy customized classes delivered by expert online
            English tutors. Whether you're a beginner or an
            advanced learner, our classes can cater to your unique
            learning style and individual goals."
          />
        </div>
    </div>
  );
}

export default LandingPage;
