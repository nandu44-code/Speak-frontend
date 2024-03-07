import React from 'react';
import Navbar from "../components/Navbar";
import Header from '../components/Header';
import FeatureCard from '../components/FeatureCard';
import { BiWorld } from "react-icons/bi"
function LandingPage() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <FeatureCard
        icon={<BiWorld color="blue" />}
        heading="Learn English online anytime, anywhere"
        paragraph="We provide an immersive virtual classroom experience that is both engaging and effective. Our interactive sessions ensure that you get the most out of every lesson."
      />
      <FeatureCard
        icon={< BiWorld color="red" />}
        heading="Learn English online anytime, anywhere"
        paragraph="We provide an immersive virtual classroom experience that is both engaging and effective. Our interactive sessions ensure that you get the most out of every lesson."
      />
    </div>
  )
}

export default LandingPage
