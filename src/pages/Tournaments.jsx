import { useState, useEffect } from "react";

import TournamentCard from "../components/TournamentCard";
import axios from "axios";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios("https://bilimjarys.online/tournaments/all?state=open&lim=10")
      .then((data) => {
        setTournaments(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section style={{ paddingTop: 0 }}>
      <section id="tournament-hero">
        <div className="container">
          <div className="stained-text">
            <h1 className="heading">Найди свое</h1>
            <p>
            На нашей платформе вы можете принять участие  в разных турнирах и соревноваться с другими участниками по всей стране и с любой точки 
            в стране
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <main>
          <form action="">
            <input
              type="text"
              placeholder="Search tournament"
              id="tournament-search"
            />
            <select name="" id="search-type">
              <option value="math">Math</option>
              <option value="chemistry">Chemistry</option>
              <option value="physics">Physics</option>
              <option value="informatics">Informatics</option>
            </select>
            <button className="join" style={{marginLeft: "20px", transform: "translateY(5px)", minWidth: "40px"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </main>
        <div className="tournament-grid">
          {tournaments.map((tournament) => (
            <TournamentCard
              key={tournament._id}
              id={tournament._id}
              name={tournament.name}
              prize={tournament.prizePool}
              grade={tournament.class}
              image={tournament.image}
              date={tournament.startDate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
