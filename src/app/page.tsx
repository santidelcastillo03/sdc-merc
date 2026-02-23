// Página principal: compone todas las secciones de la landing page en orden
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AIPotential from "@/components/sections/AIPotential";
import AIStack from "@/components/sections/AIStack";
import InsuranceUseCases from "@/components/sections/InsuranceUseCases";
import ChatBot from "@/components/sections/ChatBot";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIPotential />
        <AIStack />
        <InsuranceUseCases />
        <ChatBot />
      </main>
      <Footer />
    </>
  );
}
