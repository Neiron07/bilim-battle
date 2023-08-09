import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Tournament() {
  const params = useParams();
  const [tournament, setTournament] = useState({});
  const [winnerAvatars, setWinnerAvatars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const tournamentResponse = await axios.get(`https://bilimjarys.online/tournaments/${params.id}`);
        setTournament(tournamentResponse.data.tournament);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        // Handle error popup here or make a 404 page
      }
    };

    const fetchPlayersData = async () => {
      try {
        const playersResponse = await axios.get(`https://bilimjarys.online/tournaments/${params.id}/players`);
        setPlayers(playersResponse.data.players);
      } catch (error) {
        console.log(error);
        // Handle error popup here or make a 404 page
      }
    };

    fetchTournamentData();
    fetchPlayersData();
  }, [params.id]);

  useEffect(() => {
    if (tournament.prizeDistribution) {
      const winnerIDs = tournament.prizeDistribution
        .filter((prize) => prize.winner)
        .map((prize) => prize.winner);

      const fetchWinnerAvatars = async () => {
        const avatarPromises = winnerIDs.map(async (userID) => {
          try {
            const response = await axios.get(`https://bilimjarys.online/identity/profile/${userID}`);
            const fullName = response.data.user.fullName;
            const avatar = response.data.user.avatar || defaultAvatarURL;
            return { userID, fullName, avatar };
          } catch (error) {
            return { userID, avatar: defaultAvatarURL };
          }
        });

        const avatars = await Promise.all(avatarPromises);
        const avatarMap = avatars.reduce((map, avatarData) => {
          if (avatarData) {
            map[avatarData.userID] = avatarData.avatar;
          }
          return map;
        }, {});
        setWinnerAvatars(avatarMap);
      };

      fetchWinnerAvatars();
    }
  }, [tournament.prizeDistribution]);

  const defaultAvatarURL =
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Tanned";

  return (
    <section className="tournament">
      {/* Tournament Image as Banner */}
      {loading ? ( // Отобразите loader, если loading равен true
        <Loader />
      ) : (
        <>
          <div className="banner">
            <div className="banner-text">
              <h2>{tournament.name}</h2>
            </div>
            <img src={tournament.image} alt={tournament.name} />
          </div>
          <div className="participate-btn">
            <button>🚀   Участвовать   🚀</button>
          </div>
          {/* Tournament Timeline */}
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon">🎓</div>
              <div className="timeline-content">
                <p>
                  <strong>Класс:</strong> {tournament.class}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🔔</div>
              <div className="timeline-content">
                <p>
                  <strong>Статус:</strong> {tournament.state}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🗓️</div>
              <div className="timeline-content">
                <p>
                  <strong>Дата и время:</strong> {new Date(tournament.startDate).toLocaleDateString()}, Время: {new Date(tournament.startDate).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">⏱️</div>
              <div className="timeline-content">
                <p>
                  <strong>Продолжительность:</strong> {tournament.duration}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">👥</div>
              <div className="timeline-content">
                <p>
                  <strong>Количество участников:</strong> Мин: {tournament.minPlayers}, Макс: {tournament.maxPlayers}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🎯</div>
              <div className="timeline-content">
                <p>
                  <strong>Режим турнира:</strong> {tournament.tournamentType}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">📹</div>
              <div className="timeline-content">
                <p>
                  <strong>Видео-чат:</strong> {tournament.videoChat ? "Обязательно" : "Необязательно"}
                </p>
              </div>
            </div>
          </div>
          <div className="prizes">
            <h3>Награды за турнир</h3>
            <div className="prizes-grid">
              {/* Conditional check for tournament.prizeDistribution */}
              {tournament.prizeDistribution &&
                tournament.prizeDistribution.map((prize, index) => (
                  <div className="prize-item" key={index}>
                    {index === 0 && (
                      <div className="trophy-icon">
                        🏆
                      </div>
                    )}
                    {index === 1 && (
                      <div className="trophy-icon">
                        🥈
                      </div>
                    )}
                    {index === 2 && (
                      <div className="trophy-icon">
                        🥉
                      </div>
                    )}
                    <div className="prize">
                      <strong>{`${index + 1} место:`} <p>{prize.prize}</p></strong>
                    </div>
                    {prize.winner ? (
                      <div className="winner">
                        <strong>Победитель:</strong>
                        <div className="winner-info">
                          {winnerAvatars && winnerAvatars[prize.winner] ? (
                            <img src={winnerAvatars[prize.winner]} alt={prize.winner} />
                          ) : (
                            <img src={defaultAvatarURL} alt="Default Avatar" />
                          )}
                          <Link to={`/user/${prize.winner}`}>
                            <p>{prize.winner}</p>
                          </Link>
                        </div>

                      </div>

                    ) : (
                      <div className="winner">Будет решено..</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="rules">
            <h3>Правила</h3>
            <p>{tournament.rules}</p>
          </div>
          <div className="participants">
            <h3>Участники:</h3>
            {players.length === 0 ? (
              <p>Пока нет зарегистрировавшихся</p>
            ) : (
              <ul>
                {players.map((player, index) => (
                  <li key={index} className="player-item">
                    <Link to={`/user/${player.player._id}`} className="player-link">
                      <img src={player.player.avatar} alt="avatar" className="player-avatar" />
                      <div className="player-details">
                        <span className="player-name">{player.player.fullName}</span>
                        <span className="player-rating">({player.player.rating})</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
}
