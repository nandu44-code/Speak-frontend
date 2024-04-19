import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { BiWorld } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa6";
import { TbSettingsCog } from "react-icons/tb";
import Footer from "../components/Footer";

function LandingPage() {

  const [isActive, setIsActive] = useState(false);

  const toggleSlide = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="flex flex-col justify-evenly lg:flex-row xl:flex-row md:flex-col md:justify-center sm:flex-col my-28">
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
      <Footer />
    </div>
  );
}

export default LandingPage;
