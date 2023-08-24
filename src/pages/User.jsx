import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faCheckCircle, faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './../assets/styles/Profile.scss';

export default function User() {
  let params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let userID = params.id;
    axios(`https://bilimjarys.online/identity/profile/${userID}`)
      .then((data) => {
        console.log(data.data.user)
        setUserData(data.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="user-hero">
        <div className="container flex-start">
          <img src={userData.avatar || `https://robohash.org/smart`} alt="ava" />
          <div className="icons">
            <div className="icon status-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
              {userData.isBan}
            </div>
            <div className="icon role-icon">
              <FontAwesomeIcon icon={faUser} />
              {userData.role}
            </div>
            <div className="icon rating-icon">
              <FontAwesomeIcon icon={faStar} />
              {userData.rating}
            </div>
          </div>

          <div className="info">
            <h1>{userData.fullName}</h1>
            <ul>
              <li><b>Возраст:</b> {userData.age || 16}</li>
              <li><b>Школа:</b> {userData.school || 'Не указано'}</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: "300px" }}></div>
    </section>
  );
}
