import { BrowserRouter } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Pages wrapper
import Pages from "./pages/Pages";

// ScrollTop
import ScrollToTop from "./scrollTop";

// Main styles
import "./assets/styles/Main.scss";

// SEO
import SEO from "./components/SEO";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav/>
      <Pages/>
      <Footer/>
    </BrowserRouter>
  )
}