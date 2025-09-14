import AboutMeSnippet from "../components/AboutMeSnippet";
import HeroSection from "../components/HeroSection";
import LatestBlogPosts from "../components/LatestBlogPosts";
import NewsletterCTA from "../components/NewsletterCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>     
      <LatestBlogPosts/>  
      <AboutMeSnippet/> 
      <NewsletterCTA/>
      <Footer/>
    </div>
  );
}
