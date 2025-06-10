import About from "../../sections/About";
import Contact from "../../sections/Contact";
import Experiences from "../../sections/Experiences";
import Footer from "../../sections/Footer";
import Intro from "../../sections/Intro";
import Logo from "../../sections/Logo";
import Projects from "../../sections/Projects";

const Home = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Logo />
      <Intro />
      <About />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
