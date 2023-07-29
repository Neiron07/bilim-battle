import {useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"


export default function Tournament() {
    let params = useParams();
    const [tournament, setTournament] = useState({});
    
    useEffect(() => {
        axios(`https://bilimjarys.online/tournaments/${params.id}`).then(data => {
            setTournament(data.data.tournament);
            console.log(data.data.tournament)
        }).catch(err => {
            //Handle error popup here or make an 404 page
            console.log(err);
        });
    }, [params.id]);

    return (
        <section className="tournament">
            <div className="container flex-center-even">
                <img src={tournament.image} alt="tournament-img" />
                <div className="stained-text">
                    <h1>{tournament.name}</h1>
                    <ul>
                        <li><b>Приз: </b> {tournament.prizePool}</li>
                        <li><b>Класс: </b> {tournament.class}</li>
                        <li><b>Дата: </b> {tournament.startDate}</li>
                        <li><b>Макс. кол-во участников: </b> {tournament.maxPlayers}</li>
                        <li><b>Длительность: </b> {tournament.duration}</li>
                        <li><b>Зарегистрировано: </b> {tournament.numberOfPlayers}</li>
                        <li><b>Правила: </b>{tournament.rules}</li>
                    </ul>

                    <button className = "join">Зарегистрироваться</button>
                </div>
            </div>
        </section>
    )
}