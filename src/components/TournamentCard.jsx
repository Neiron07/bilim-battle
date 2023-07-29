import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faUserGraduate, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

function TournamentCard(props) {
  return (
    <Link to={"/tournaments/" + props.id}>
      <div className="card">
        <div className="flex-center">
          <img src={props.image} alt="tournament-mini" />
          <div className="tournament-info">
            <h3>{props.name}</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faTrophy} /> {props.prize}
              </li>
              <li>
                <FontAwesomeIcon icon={faUserGraduate} /> {props.grade}
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} /> {props.date} Астана
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} /> {props.count_players} игроков
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
  state: PropTypes.string
};

export default TournamentCard;
