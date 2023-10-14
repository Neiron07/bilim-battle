import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import heroMain from "../assets/img/banner.png";
import format from "../assets/img/format2.png";
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
import { Trans } from 'react-i18next';
import FAQ from "../components/FAQ";

export default function Main() {
  return (
    <section style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="stained-text" style={{ paddingBottom: 40 }}>
          <h1 className="hero-heading">BILIM JARYS</h1>
          <p><Trans i18nKey="MainInfo" /></p>
          <p><Trans i18nKey="JoinMain" /></p>
          <Link to="/tournaments">
            <button className="join"><Trans i18nKey="MainButton" /></button>
          </Link>
        </div>
        <div className="horizontal-line"></div>
        <Carousel autoPlay infiniteLoop dynamicHeight interval={6000}  showArrows={false} showStatus={false} onClickItem={()=> window.location.href = 'https://bilimjarys.kz/tournaments'}>
          <div>
            <img src='https://wmpics.space/di-9RNL.png' alt="banner-1" style={{ borderRadius: '20px' }}/>
          </div>
          <div>
            <img src='https://wmpics.space/di-W9BY.png' alt="banner-2" style={{ borderRadius: '20px' }}/>
          </div>
          <div>
            <img src='https://wmpics.space/di-Z4NL.png' alt="banner-3" style={{ borderRadius: '20px' }}/>
          </div>
          <div>
            <img src='https://wmpics.space/di-HS7M.png' alt="banner-4" style={{ borderRadius: '20px' }}/>
          </div>
          <div>
            <img src='https://wmpics.space/di-1H40.png' alt="banner-5" style={{ borderRadius: '20px' }}/>
          </div>
          <div>
            <img src='https://wmpics.space/di-SFNP.png' alt="banner-6" style={{ borderRadius: '20px' }}/>
          </div>
        </Carousel>
        <div className="horizontal-line"></div>

        {/* Блок "Турниры по школьным предметам" */}
        <div className="school-subjects">
          <h2><Trans i18nKey="MainSubjectsTournaments" /></h2>
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
                  <strong><Trans i18nKey="KazHistory" /></strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faBook} /></div>
              <div className="timeline-content">
                <p>
                  <strong><Trans i18nKey="RussianLang" /></strong>
                </p>
              </div>
            </div>
            <div className="timeline-item" style={{ background: "#0148BF" }}>
              <div className="timeline-icon"><FontAwesomeIcon icon={faLanguage} /></div>
              <div className="timeline-content">
                <p>
                  <strong><Trans i18nKey="EnglishLang" /></strong>
                </p>
              </div>
            </div>
          </div>
          </Link>
        </div>

        {/* Блок "Формат участия" */}
        <div className="participation-format">
          <h2><Trans i18nKey="FormatParticipation" /></h2>
          <img src={format} style={{ maxWidth: "100%" }} />
        </div>

        {/* Раздел FAQ */}
        <div className="faq">
          <h2><Trans i18nKey="FAQ" /></h2>
          <FAQ />
        </div>
      </div>
    </section>
  );
}
