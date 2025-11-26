import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PascaleRouter from "./router/PascaleRouter";
import BuyArtworkModal from "./components/BuyArtworkModal"; 

export default function App() {
  return (
    <>
      <Header />
      <PascaleRouter />
      <ScrollToTopButton />
      <Footer />
      <BuyArtworkModal />
    </>
  );
}

