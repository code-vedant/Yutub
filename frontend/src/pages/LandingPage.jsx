import Header from "../components/landingPage/Header";
import "../style/landing.css";
import Para from "../components/animated/Para";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Heading from "../components/animated/Heading";
import Footer from "../components/landingPage/Footer";
import TextPressure from "../blocks/TextAnimations/TextPressure/TextPressure";
import Orb from "../blocks/Backgrounds/Orb/Orb";

export default function LandingPage() {
  const videoRef = useRef();
  const { scrollY } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollY, [0, 500, 1000], [1, 1.2, 1.5]);

  return (
    <main className="landing-main">
      <header className="landing-header">
        <Header />
      </header>
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-title">
          <TextPressure
            text="YUTUB"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor="#000000"
            strokeColor="#ff0000"
            minFontSize={300}
            fontFamily="montserat"
          />
        </div>
        <div className="hero-sub">
          <div className="hero-para-left">
            <Para>Your Ultimate Tube for Uploads & Broadcasting</Para>
          </div>
          <div className="hero-para-right">
            <Para>
              Create, share, and connect like never before with an all-in-one
              platform for videos, playlists, photos, posts, and more. Whether
              you're building your brand, showcasing your creativity, or simply
              expressing yourself, YUTUB transforms your channel into a dynamic
              website complete with media-rich content and a vibrant community.
              It's more than just video it&apos;s your digital home.
            </Para>
          </div>
        </div>
        <motion.div
          ref={videoRef}
          style={{ scale }}
          className="video-container"
        ></motion.div>
      </section>
      <section className="landing-features">
        <div className="features-title">
          <Heading type="h2">Features</Heading>
        </div>
        <div className="features-cards">
          <div className="card1"> sdad </div>
          <div className="card2"> sdad </div>
          <div className="card3"> sdad </div>
          <div className="card4"> sdad </div>
        </div>
      </section>
      <section className="landing-actions">
        <div className="actions-main">
          <div style={{ width: "100%",scale:"300%", position: "relative" }}>
            <Orb
              hoverIntensity={0.2}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <Footer />
      </footer>
    </main>
  );
}
