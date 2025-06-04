import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  Code,
  LayoutGrid,
  Sparkles,
  TerminalSquare,
  Wand2,
  Zap,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import BannerSection from "./BannerSection";
import SupportedPlatforms from "./SupportedPlatform";
import { Button } from "./UI/Button";
import { useNavigate } from "react-router-dom";
import Gallery3D from "./ModelsGallery";

// Feature data
const features = [
  {
    icon: <Sparkles className="text-blue-400" />,
    title: "AI-Powered Generation",
    description:
      "Create detailed 3D models from text descriptions using our advanced AI algorithms.",
  },
  {
    icon: <Zap className="text-blue-400" />,
    title: "Fast Rendering",
    description:
      "Experience lightning-fast rendering times with our optimized cloud processing.",
  },
  {
    icon: <LayoutGrid className="text-blue-400" />,
    title: "Multiple Formats",
    description:
      "Export your creations in various formats compatible with all major 3D software.",
  },
  {
    icon: <Wand2 className="text-blue-400" />,
    title: "Style Customization",
    description:
      "Apply different artistic styles and aesthetics to your generated models.",
  },
  {
    icon: <Award className="text-blue-400" />,
    title: "Professional Quality",
    description:
      "Achieve industry-standard quality suitable for games, VR, and commercial applications.",
  },
  {
    icon: <Code className="text-blue-400" />,
    title: "Developer API",
    description:
      "Integrate our 3D generation capabilities directly into your applications.",
  },
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "50px",
  });
  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col items-center w-full max-w-sm glass-panel p-6 sm:p-8 card-hover-effect rounded-xl overflow-hidden border border-white/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group text-center"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      <div className="p-3 mb-4 inline-flex items-center justify-center rounded-full bg-blue-500/10">
        {feature.icon}
      </div>
      <h3 className="text-xl font-medium mb-2 text-white">{feature.title}</h3>
      <p className="text-zinc-400">{feature.description}</p>
    </motion.div>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <>
      <Helmet>
        <title>YVO3D - AI-Powered 3D Model Generation</title>
        <meta
          name="description"
          content="YVO3D - Bespoke AI for the Next Generation of 3D Models"
        />
      </Helmet>

      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 origin-[0%] z-[100]"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-black text-white flex flex-col">
        <main className="flex-1 pt-16">
          <Hero />

          <section className="bg-black relative py-[11px]">
            <div className="content-container max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.h2
                  className="section-heading text-6xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  Powerful{" "}
                  <span className=" text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    AI{" "}
                  </span>
                </motion.h2>
                <motion.p
                  className="section-subheading text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Reimagine 3D modeling with tools that transform how creators
                  work
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="group"
                    onClick={() => navigate("/dashboard")}
                  >
                    Try 3D GEN Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          <BannerSection
            imageUrl="/lovable-Uploads/8c34f9f9-795f-42a8-bb64-b9b45755f1d5.png"
            height="70vh"
            contentPosition="center"
            accent={true}
            parallax={true}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.span
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium backdrop-blur-sm border border-blue-500/20 mb-4"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                YVO3D Platform
              </motion.span>

              <motion.h2
                className="text-4xl md:text-5xl font-medium tracking-tight mb-4"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
              >
                Unleash Your Creative Potential
              </motion.h2>

              <motion.p
                className="text-xl text-zinc-300 mb-8"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                }}
              >
                From concept to creation, our AI-powered platform helps you
                bring your 3D visions to life faster than ever before
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                }}
              >
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="primary"
                  className="group"
                >
                  Explore the Platform
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </BannerSection>

          <div className="bg-black py-[4px]">
            <div className="content-container py-[55px]">
              <div className="text-center mb-16">
                <motion.h2
                  className="section-heading text-6xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  Featured{" "}
                  <span className="text-zinc-50 text-6xl font-semibold">
                    Collection
                  </span>
                </motion.h2>
                <motion.p
                  className="section-subheading text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Discover the latest AI-generated 3D models from our creative
                  community
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1 }}
              >
                <Gallery3D />
              </motion.div>
            </div>
          </div>

          <SupportedPlatforms />

          <BannerSection
            imageUrl="/lovable-uploads/44429847-6e06-4446-8b33-f123cb501952.png"
            height="90vh"
            contentPosition="left"
            accent={true}
            parallax={true}
          >
            <div className="max-w-2xl mx-auto md:ml-auto md:mr-24 text-right">
              <motion.span
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium backdrop-blur-sm border border-blue-500/20 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Architecture
              </motion.span>

              <motion.h2
                className="text-4xl md:text-5xl font-medium tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Architectural Visions
              </motion.h2>

              <motion.p
                className="text-xl text-zinc-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Design futuristic structures and environments with precision and
                style using our powerful AI tools
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button variant="primary" className="group">
                  Explore Designs
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </BannerSection>

          <section className="bg-black py-24 border-t border-white/5">
            <div className="content-container text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-heading text-6xl font-semibold mb-3">
                  Ready to create?
                </h2>
                <p className="section-subheading mb-12">
                  Start generating 3D models today with our AI-powered tools
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate("/workspace")}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/gallery")}
                  >
                    Learn More
                  </Button>
                </div>

                <p className="mt-6 text-sm text-zinc-500">
                  No credit card required. 15 free generations included.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Index;
