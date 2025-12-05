import Footer from "./components/Footer";
import Header from "./components/Header";
// import ScrollToTopButton from "./components/ScrollToTopButton";
import PascaleRouter from "./router/PascaleRouter";
import BuyArtworkModal from "./components/BuyArtworkModal"; 
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from "react";

export default function App() {
  useEffect(()=>{
  AOS.init({
    disable: false, 
    startEvent: 'DOMContentLoaded',
    mirror: true, 

    duration: 1000,
    once: false,
  })
  AOS.refresh();
},[])
  return (
    <>
      <Header />
      <PascaleRouter />
      {/* <ScrollToTopButton /> */}
      <Footer />
      <BuyArtworkModal />
    </>
  );
}

