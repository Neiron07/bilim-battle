import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <nav>
      <div className="container flex-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex-center navlinks">
          <Link to="/">Главная</Link>
          <Link to="/tournaments">Турниры</Link>
          <Link to="/stats">Статистика</Link>
        </div>
        <Link to={isLoggedIn ? `/user/${localStorage.getItem("id")}` : "/login"}>
          <button>
            {isLoggedIn ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            ) : (
              "Войти"
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}
