import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import heroMain from "../assets/img/banner.png";
import format from "../assets/img/format.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faLaptop,
  faAtom,
  faGlobe,
  faHistory,
  faLanguage,
  faBook,
  faGraduationCap,
  faDna
} from "@fortawesome/free-solid-svg-icons";
import FAQ from "../components/FAQ";

export default function Main() {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="stained-text" style={{ paddingBottom: 40 }}>
          <h1 className="hero-heading">BILIM JARYS</h1>
          <p>
            Присоединяйтесь к захватывающим призовым онлайн-турнирам по школьным предметам на платформе BILIM JARYS! Участвуйте в соревнованиях с учениками из разных уголков страны, докажите свои знания и выигрывайте ценные призы.
          </p>
          <p>Зарегистрируйтесь сегодня и получите - 1000 очков рейтинга!</p>
          <Link to="/tournaments">
            <button className="join">Исследовать</button>
          </Link>
        </div>
        <div className="horizontal-line"></div>
        <Carousel autoPlay infiniteLoop dynamicHeight interval={4500}  showArrows={false} showStatus={false} onClickItem={()=> window.location.href = 'https://bilimjarys.vercel.app/tournaments'}>
          <div>
            <img src='https://wmpics.space/di-R21C.png' alt="banner-1" />
          </div>
          <div>
            <img src='https://wmpics.space/di-VYOD.png' alt="banner-2" />
          </div>
          <div>
            <img src='https://wmpics.space/di-5GQ0.png' alt="banner-3" />
          </div>
          <div>
            <img src='https://wmpics.space/di-R6VK.png' alt="banner-4" />
          </div>
          <div>
            <img src='https://wmpics.space/di-80M0.png' alt="banner-5" />
          </div>
        </Carousel>
        <div className="horizontal-line"></div>

        {/* Блок "Турниры по школьным предметам" */}
        <div className="school-subjects">
          <h2>Турниры по школьным предметам</h2>
          <Link to="/tournaments">
          <div className="timeline">
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faGraduationCap} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Математика</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faLanguage} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Қазақ тiлi</strong>
                </p>
              </div>
            </div>
            {/* Добавьте остальные предметы здесь */}
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faAtom} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Физика</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faLaptop} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Информатика</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faFlask} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Химия</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faDna} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Биология</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faGlobe} /></div>
              <div className="timeline-content">
                <p>
                  <strong>География</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faHistory} /></div>
              <div className="timeline-content">
                <p>
                  <strong>История Казахстана</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faBook} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Русский язык</strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faLanguage} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Английский язык</strong>
                </p>
              </div>
            </div>
          </div>
          </Link>
        </div>

        {/* Блок "Формат участия" */}
        <div className="participation-format">
          <h2>Формат участия</h2>
          <img src={format} style={{ maxWidth: "100%" }} />
        </div>

        {/* Раздел FAQ */}
        <div className="faq">
          <h2>Часто задаваемые вопросы</h2>
          <FAQ />
        </div>
      </div>
    </section>
  );
}
