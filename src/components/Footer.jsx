import { Trans } from 'react-i18next';

export default function Footer() {
  return (
    <footer>
      <div className="container flex-start">
        <div className="col">
          <h1>Bilim Jarys</h1>
          <p>Jogary bilim - sapaly bilim</p>
          <div className="flex-center media-links">
            <a href="https://instagram.com/bilim.jarys?igshid=MWZjMTM2ODFkZg==" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M12 0c6.6274 0 12 5.3726 12 12s-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0zm3.115 4.5h-6.23c-2.5536 0-4.281 1.6524-4.3805 4.1552L4.5 8.8851v6.1996c0 1.3004.4234 2.4193 1.2702 3.2359.7582.73 1.751 1.1212 2.8818 1.1734l.2633.006h6.1694c1.3004 0 2.389-.4234 3.1754-1.1794.762-.734 1.1817-1.7576 1.2343-2.948l.0056-.2577V8.8851c0-1.2702-.4234-2.3589-1.2097-3.1452-.7338-.762-1.7575-1.1817-2.9234-1.2343l-.252-.0056zM8.9152 5.8911h6.2299c.9072 0 1.6633.2722 2.2076.8166.4713.499.7647 1.1758.8103 1.9607l.0063.2167v6.2298c0 .9375-.3327 1.6936-.877 2.2077-.499.4713-1.176.7392-1.984.7806l-.2237.0057H8.9153c-.9072 0-1.6633-.2722-2.2076-.7863-.499-.499-.7693-1.1759-.8109-2.0073l-.0057-.2306V8.885c0-.9073.2722-1.6633.8166-2.2077.4712-.4713 1.1712-.7392 1.9834-.7806l.2242-.0057h6.2299-6.2299zM12 8.0988c-2.117 0-3.871 1.7238-3.871 3.871A3.8591 3.8591 0 0 0 12 15.8408c2.1472 0 3.871-1.7541 3.871-3.871 0-2.117-1.754-3.871-3.871-3.871zm0 1.3911c1.3609 0 2.4798 1.119 2.4798 2.4799 0 1.3608-1.119 2.4798-2.4798 2.4798-1.3609 0-2.4798-1.119-2.4798-2.4798 0-1.361 1.119-2.4799 2.4798-2.4799zm4.0222-2.3589a.877.877 0 1 0 0 1.754.877.877 0 0 0 0-1.754z" />
              </svg>
            </a>
            <a href="https://t.me/bilimjarys" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-telegram"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@bilim.jarys?_t=8fi615IAevd&_r=1" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-tiktok"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
                  fill="white"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="col">
          <h2><Trans i18nKey="Contact" /></h2>
          <p>
            Электр. почта: bilimjarys@gmail.com<br /><br />
            Телефон: 8 701 536 90 40
          </p>
          <p>
            <a href="https://docs.google.com/document/d/1y6NIbUcGny4S92d7oEb40-3o6OjuiBWXYjwJdQLn6nk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}><Trans i18nKey="UserPolicy" /></a>
            <br /><br />
            <a href="https://docs.google.com/document/d/1zf8sXhWOylNG8Y6IbibwvKiqOwWTyEqjnRICKEr-ZmM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}><Trans i18nKey="CookiePolicy" /></a>
          </p>
        </div>


        <div className="col">
          <h2><Trans i18nKey="AboutUs" /></h2>
          <p>
            <Trans i18nKey="AboutUsInfo" />
          </p>
        </div>
      </div>
    </footer>
  );
}
