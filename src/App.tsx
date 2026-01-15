import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import PascaleRouter from "./router/PascaleRouter";
import FloatingSearch from "./components/FloatingSearch";
import BuyArtworkModal from "./components/BuyArtworkModal";
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <PascaleRouter />
      <FloatingSearch /> 
      <Footer />
      <BuyArtworkModal />
    </>
  );
}

