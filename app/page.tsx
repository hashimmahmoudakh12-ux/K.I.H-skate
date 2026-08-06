import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { About } from "@/components/About";
import { Instructors } from "@/components/Instructors";
import { Lessons } from "@/components/Lessons";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <WhyChooseUs />
        <About />
        <Instructors />
        <Lessons />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
