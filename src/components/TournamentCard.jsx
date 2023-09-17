import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faUserGraduate, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Trans } from 'react-i18next';

function TournamentCard(props) {
  return (
    <Link to={"/tournaments/" + props.id}>
      <div className="card">
        <div className="flex-center">
          <img src={props.image || 'https://i.imgur.com/W5N1x8Z.jpg'} alt="tournament-mini" />
          <div className="tournament-info">
            <h3>{props.name}</h3>
            <div className="horizontal-line"></div>
            <ul>
              <li>
                <FontAwesomeIcon icon={faTrophy} /> {props.prize} <Trans i18nKey="PrizeCount" />
              </li>
              <li>
                <FontAwesomeIcon icon={faUserGraduate} /> {props.grade}
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} /> {props.date} Астана
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} /> {props.count_players}/{props.maxPlayers} <Trans i18nKey="PlayersCount" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Props interface
TournamentCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  prize: PropTypes.number,
  grade: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  count_players: PropTypes.number, // Добавили новый prop для количества игроков
  state: PropTypes.string,
  maxPlayers: PropTypes.number
};

export default TournamentCard;
