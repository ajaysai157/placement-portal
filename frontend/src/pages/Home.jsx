import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Companies from "../components/home/Companies";
import FeaturedJobs from "../components/home/FeaturedJobs";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Companies />
      <FeaturedJobs />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;