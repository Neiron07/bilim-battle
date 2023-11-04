import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faGamepad, faLifeRing, faQuestionCircle, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Modal from "../components/Modal";
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import jcoin from './../../public/j-coin.png'
export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const currentLanguage = localStorage.getItem('language')
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    // Определяем новый язык на основе текущего
    const newLanguage = currentLanguage === 'kz' ? 'ru' : 'kz';

    // Меняем язык с помощью i18n.changeLanguage
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserBalance(0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios.get(`https://bilimjarys.online/identity/me`, { headers })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('userData', JSON.stringify(response.data));
            setUserBalance(response.data.user.balance);
            setIsBan(response.data.user.isBan)
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const navRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="logo-container">
          <Link to="/">
            <span className="logo-text">Bilim Jarys</span>
          </Link>
        </div>
        {isLoggedIn && (
          <span className="user-balance">
            Баланс: <strong>
              <Link to="/faq" style={{ color: '#0148BF' }}>
                {userBalance} </Link>
              <img
                  src={jcoin}
                  alt="Бонусная монета"
                  width="25"
                  height="25"
                  className="coin-icon"
                />
            </strong>
          </span>
        )}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="menu">
            <Link to={isLoggedIn ? `/user/${localStorage.getItem("id")}` : "/login"} className="menu-item" onClick={toggleMenu}>
              {isLoggedIn ? (
                <>
                  <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> <b><Trans i18nKey="MyAccountNav" /></b>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUser} className="menu-item-icon" /> <b><Trans i18nKey="Login" /></b>
                </>
              )}
            </Link>
            <div className="horizontal-liner"></div>
            <Link to="/tournaments" className="menu-item-1" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faGamepad} className="menu-item-icon" /> <Trans i18nKey="TournamentsNav" />
            </Link>
            <Link to="/faq" className="menu-item" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faQuestionCircle} className="menu-item-icon" /> <Trans i18nKey="FAQNav" />
            </Link>
            <Link to="https://t.me/bjsupport_bot" className="menu-item" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faLifeRing} className="menu-item-icon" /> <Trans i18nKey="SupportNav" />
            </Link>
            <div className="horizontal-liner"></div>
            <div className="menu-item" onClick={toggleLanguage}>
              <FontAwesomeIcon icon={faGlobe} className="menu-item-icon" /> <Trans i18nKey="lang" /> {localStorage.getItem('language') === 'kz' ? 'KZ' : 'RU'}
            </div>
            <div className="horizontal-liner"></div>
            {isLoggedIn ? (
              <Link to="/" className="menu-item" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-item-icon" /> <Trans i18nKey="SignOutNav" />
              </Link>
            ) : null}
          </div>
        )}
      </nav>
      <Modal isOpen={isBan} onClose={false}>
        <h2>Вы были забанены на платформе Bilim Jarys!</h2>
        <p>Вы имеете право подать аппеляцию, написав письмо на почту <b>bilimjarys@gmail.com</b></p>
      </Modal>
    </>
  );
}
