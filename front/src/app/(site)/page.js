import AboutMeSnippet from "../../components/AboutMeSnippet";
import HeroSection from "../../components/HeroSection";
import LatestBlogPosts from "../../components/LatestBlogPosts";
import NewsletterCTA from "../../components/NewsletterCTA";

export default function Home() {
  return (
    <div>
      <HeroSection/>     
      <LatestBlogPosts/>  
      <AboutMeSnippet/> 
      <NewsletterCTA/>
    </div>
  );
}
