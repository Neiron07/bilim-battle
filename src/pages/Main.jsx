import { Link } from "react-router-dom";
import heroMain from "../assets/img/banner.png";

export default function Main() {
  return (
    <section>
      <div className="container flex-center">
        <div className="stained-text">
          <h1 className="hero-heading">BILIM JARYS</h1>
          <p>
          Примите участие в захватывающих призовых онлайн турнирах по школьным предметам на платформе BILIM JARYS. Соревнуйтесь с учениками из всей страны, докажите свои знания, выигрывайте призы.
          </p>
          <p>Зарегистрируйся сегодня и получи - 1000 очков рейтинга!</p>
          <Link to="/tournaments">
            <button className="join">Исследовать</button>
          </Link>
        </div>
        <img src={heroMain} alt="hero-main" style={{ maxWidth: "50%", marginLeft: "auto" }}/>
      </div>
    </section>
  );
}
