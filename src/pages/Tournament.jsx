// Tournament.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Tournament() {
  let params = useParams();
  const [tournament, setTournament] = useState({});
  const [winnerData, setWinnerData] = useState(null);

  useEffect(() => {
    axios(`https://bilimjarys.online/tournaments/${params.id}`)
      .then((data) => {
        setTournament(data.data.tournament);
        if (data.data.tournament.prizeDistribution) {
          const winnerId = data.data.tournament.prizeDistribution[0].winner;
          if (winnerId) {
            // Fetch the winner's data
            axios(`https://bilimjarys.online/identity/profile/${winnerId}`)
              .then((winnerData) => {
                setWinnerData(winnerData.data.user);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        // Handle error popup here or make a 404 page
        console.log(err);
      });
  }, [params.id]);

  // Function to get the winner's name or "Будет решено"
  const getWinnerName = () => {
    if (tournament.prizeDistribution) {
      const winner = tournament.prizeDistribution.find((prize) => prize.winner);
      if (winner) {
        return winner.winner;
      }
    }
    return "Будет решено...";
  };

  // Function to get the winner's avatar URL
  const getWinnerAvatar = () => {
    if (winnerData && winnerData.avatar) {
      return winnerData.avatar;
    }
    // Return a default avatar URL if winner's avatar is not available
    return "https://example.com/default-avatar.jpg";
  };

  return (
    <section className="tournament">
      {/* Tournament Image as Background */}
      <div
        className="tournament-image"
        style={{ backgroundImage: `url(${tournament.image})` }}
      ></div>

      <div className="container">
        {/* Block 1: Tournament Information */}
        <div className="tournament-info">
          <div className="stained-text">
            <h1 className="tournament-name">{tournament.name}</h1>
            <ul>
              <li>
                <b>Приз: </b> {tournament.prizePool}
              </li>
              <li>
                <b>Класс: </b> {tournament.class}
              </li>
              <li>
                <b>Дата: </b> {tournament.startDate}
              </li>
              <li>
                <b>Макс. кол-во участников: </b> {tournament.maxPlayers}
              </li>
              <li>
                <b>Длительность: </b> {tournament.duration}
              </li>
              <li>
                <b>Зарегистрировано: </b> {tournament.numberOfPlayers}
              </li>
              <li>
                <b>Правила: </b>
                {tournament.rules}
              </li>
            </ul>
            <button className="join">Зарегистрироваться</button>
          </div>
        </div>
        {/* Block 2: Prizes and Awards */}
        <div className="tournament-prizes">
          <h2>Награды за места</h2>
          <table>
            <thead>
              <tr>
                <th>Место</th>
                <th>Имя участника</th>
                <th>Приз</th>
              </tr>
            </thead>
            <tbody>
              {tournament.prizeDistribution &&
                tournament.prizeDistribution.map((prize, index) => (
                  <tr key={prize._id}>
                    <td>{index + 1}</td>
                    <td>
                      {prize.winner ? (
                        <Link to={`/user/${prize.winner}`}>
                          <div className="winner-avatar">
                            <img
                              className="avatar-circle"
                              src={getWinnerAvatar()}
                              alt="Winner Avatar"
                            />
                          </div>
                          <div className="winner-name">
                            {winnerData ? (
                              <Link to={`/user/${winnerData._id}`}>
                                {winnerData.fullName}
                              </Link>
                            ) : (
                              "Будет решено..."
                            )}
                          </div>
                        </Link>
                      ) : (
                        "Будет решено"
                      )}
                    </td>
                    <td className="prize-icon">
                      {index === 0
                        ? "🏆"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : ""}
                      {index < 3 ? " " + prize.prize : ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
