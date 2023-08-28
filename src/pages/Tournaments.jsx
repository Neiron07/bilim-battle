import { useState, useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import axios from "axios";
import Loader from "../components/Loader";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentStatus, setTournamentStatus] = useState("open"); // "open" или "closed"
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios(
      `https://bilimjarys.online/tournaments/all?state=${tournamentStatus}&lim=10`
    )
      .then((data) => {
        setTournaments(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tournamentStatus]);

  return (
    <section style={{ paddingTop: 0 }}>
      {loading ? ( // Отобразите loader, если loading равен true
        <Loader />
      ) : (
      <>
      <section id="tournament-hero">
        <div className="container">
          <div className="stained-text">
            <h1 className="heading">Найди свое</h1>
            <p>
              На нашей платформе вы можете принять участие в разных турнирах и соревноваться с другими участниками по всей стране и с любой точки в стране
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <main>
          <form action="">
            <select
              name=""
              id="search-type"
              value={tournamentStatus}
              onChange={(e) => setTournamentStatus(e.target.value)}
            >
              <option value="open">Открытые</option>
              <option value="closed">Завершенные</option>
            </select>
          </form>
        </main>
        <div className="tournament-grid">
          {tournaments.map((tournament) => {
            const formattedDate = new Date(tournament.startDate).toLocaleString("ru-RU", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            });

            return (
              <TournamentCard
                key={tournament._id}
                id={tournament._id}
                name={tournament.name}
                prize={tournament.prizeDistribution.length}
                grade={tournament.class}
                image={tournament.image}
                date={formattedDate}
                count_players={tournament.numberOfPlayers}
                state={tournament.state}
                maxPlayers={tournament.maxPlayers}
              />
            );
          })}
        </div>
      </div>
      </>
    )}
    </section>
  );
}
