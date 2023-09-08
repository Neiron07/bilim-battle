import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faBell, faCalendar, faStopwatch, faUsers, faBullseye, faVideo, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from "../components/Modal";
import Timer from "../components/Timer";

export default function Tournament() {
  const params = useParams();
  const [tournament, setTournament] = useState({});
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [participated, setParticipated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(false);
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [showMaxPlayersModal, setShowMaxPlayersModal] = useState(false);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setFieldErrors(false);
    setShowClosedModal(false);
    setShowMaxPlayersModal(false);
  };
  const handleParticipate = async () => {
    try {
      const token = localStorage.getItem("token");
      const playerId = localStorage.getItem("id");

      if (!token || !playerId) {
        // Handle the case when token or playerId is not available
        setFieldErrors(true);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`
      };

      const requestBody = {
        playerId
      };

      const response = await axios.post(
        `https://bilimjarys.online/tournaments/join/${params.id}`,
        requestBody,
        { headers }
      );
      if (response.status === 201) {
        const storedParticipation = JSON.parse(localStorage.getItem('participationStatus')) || {};
        storedParticipation[params.id] = true;
        localStorage.setItem('participationStatus', JSON.stringify(storedParticipation));
        setShowSuccessModal(true);
        setParticipated(true);
        setTimeout(function() {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.error === '9') {
        setShowErrorModal(true)
      }
      if (error.response.data.error === 7) {
        localStorage.clear();
        setFieldErrors(true);
      }
      if (error.response.data.error === '11') {
        setShowClosedModal(true);
      }
      if (error.response.data.error === '12') {
        setShowMaxPlayersModal(true);
      }
    }
  };

  useEffect(() => {
    const playerId = localStorage.getItem('id');
    const isParticipant = players.some(player => player.player._id === playerId);
  
    setParticipated(isParticipant);
  }, [players]);
  

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const tournamentResponse = await axios.get(`https://bilimjarys.online/tournaments/${params.id}`);
        setTournament(tournamentResponse.data.tournament);
        setLoading(false);
        console.log(tournamentResponse.data.tournament)
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

  const defaultAvatarURL =
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Tanned";

  return (
    <section className="tournament" style={{ backgroundColor: 'rgb(239, 247, 254)' }}>
      {loading ? ( // Отобразите loader, если loading равен true
        <Loader />
      ) : (
        <>
          <div className="banner">
            <div className="tournament-information">
              <aside className="tournament-name"> {/* Изменено на aside */}
                <div className="tournament-detail-info">
                  <div className="tournament-id-copy">
                    <CopyToClipboard text={`#${tournament._id}`}>
                      <h2>
                        {tournament.name}{' '}
                        <span className="tournament-id">#{tournament._id}</span>
                      </h2>
                    </CopyToClipboard>
                  </div>
                  <div className="tournament-block">
                    <div className="tournament-date">
                      <Timer targetDate={tournament.startDate} />
                    </div>
                    <div className="participate-btn">
                      <button onClick={handleParticipate}>
                        {participated ? "Вы уже участвуете в турнире" : "Участвовать"}
                      </button>
                    </div>
                    <div className="social-buttons">
                      <a href="https://t.me/bilimjarys" target="_blank" rel="noopener noreferrer">
                        <button>Обсудить турнир</button>
                      </a>
                    </div>
                    <div className="tournament-btn">
                      {participated && tournament.extra_data && tournament.extra_data.link && (
                        <a href={tournament.extra_data.link} target="_blank" rel="noopener noreferrer">
                          <button>Перейти к заданиям</button>
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </aside>
              <div className="tournament-image"> {/* Перемещено вправо */}
                <img src={tournament.image || 'https://i.imgur.com/W5N1x8Z.jpg'} alt={tournament.name} />
              </div>
            </div>
          </div>
          {/* Tournament Timeline */}

          <div className="infor">
            <h3>Информация</h3>
          </div>
          <div className="horizontal-line"></div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faGraduationCap} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Класс:</strong> {tournament.class}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faBell} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Статус:</strong> {tournament.state}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faMoneyBill} /></div>
              <div className="timeline-content">
                <p>
                  Взнос: <strong>{tournament.entryFee}🟡 (jarys-coin)</strong>
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faCalendar} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Дата и время:</strong> {new Date(tournament.startDate).toLocaleString("ru-RU", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}{""}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faStopwatch} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Время на выполнение:</strong> {tournament.duration}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faUsers} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Количество участников:</strong> Мин: {tournament.minPlayers}, Макс: {tournament.maxPlayers}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faBullseye} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Режим турнира:</strong> {tournament.tournamentType}
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><FontAwesomeIcon icon={faVideo} /></div>
              <div className="timeline-content">
                <p>
                  <strong>Видео-чат:</strong> {tournament.videoChat ? "Обязательно" : "Необязательно"}
                </p>
              </div>
            </div>
          </div>
          <div className="prizes">
            <h3>Награды за турнир</h3>
            <div className="horizontal-line"></div>
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
                          {prize.winner.avatar ? (
                            <img src={prize.winner.avatar} alt={prize.winner} />
                          ) : (
                            <img src={defaultAvatarURL} alt="Default Avatar" />
                          )}
                          <Link to={`/user/${prize.winner._id}`}>
                            <p>{prize.winner.fullName}</p>
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
            <div className="horizontal-line"></div>
            <div dangerouslySetInnerHTML={{ __html: tournament.rules }} />
          </div>
          <div className="participants">
            <h3>Участники:</h3>
            <div className="horizontal-line"></div>
            {players.length === 0 ? (
              <p>Пока нет зарегистрировавшихся</p>
            ) : (
              <ul>
                {players.map((player, index) => (
                  <li key={index} className="player-item">
                    <Link to={`/user/${player.player._id}`} className="player-link" style={{
                      backgroundImage: player.player.cover ? `url(${player.player.cover})` : null,
                      backgroundPosition: 'center',
                    }}>
                      <img src={player.player.avatar} alt="avatar" className="player-avatar" style={{}} />
                      <div className="player-details">
                        <span className="player-name">{player.player.fullName}</span>
                        <span className="player-rating"> ({player.player.rating})</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      <Modal isOpen={showSuccessModal} onClose={handleCloseModal}>
        <h2>Успешно!</h2>
        <p>Вы успешно зарегистрировались на турнир!</p>
      </Modal>
      <Modal isOpen={showErrorModal} onClose={handleCloseModal}>
        <h2>Уведомление!</h2>
        <p>Вы уже участвуете в турнире!</p>
      </Modal>
      <Modal isOpen={fieldErrors} onClose={handleCloseModal}>
        <h2>Ошибка!</h2>
        <p>Для участия в турнире Вы должны залогиниться на сайте!</p>
      </Modal>
      <Modal isOpen={showClosedModal} onClose={handleCloseModal}>
        <h2>Турнир закрыт</h2>
        <p>Извините, этот турнир закрыт для участия.</p>
      </Modal>
      <Modal isOpen={showMaxPlayersModal} onClose={handleCloseModal}>
        <h2>Максимальное количество игроков</h2>
        <p>Извините, максимальное количество игроков для этого турнира уже достигнуто.</p>
      </Modal>
    </section>
  );
}
