import Navigation from "./components/Navigation";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <HomeSection />
      <AboutSection />
      <WorkSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
