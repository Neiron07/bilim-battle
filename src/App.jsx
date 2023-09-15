import { BrowserRouter } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Lang
import { I18nextProvider } from 'react-i18next';
import i18n from './../src/utils/i18n';
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
      <I18nextProvider i18n={i18n}>
      <ScrollToTop />
      <Nav/>
      <Pages/>
      <Footer/>
      </I18nextProvider>
    </BrowserRouter>
  )
}