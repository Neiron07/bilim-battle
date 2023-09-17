import { useState, useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import axios from "axios";
import Loader from "../components/Loader";
import { Trans } from 'react-i18next';

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
            <h1 className="heading"><Trans i18nKey="findMe" /></h1>
            <p>
              <Trans i18nKey="findMeInfo" />
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
              <option value="open"><Trans i18nKey="Open" /></option>
              <option value="closed"><Trans i18nKey="Close" /></option>
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
