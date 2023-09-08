import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <section style={{ backgroundColor: '#EFF7FE', paddingTop: 0 }}>
      <div className="user-hero">
        <div className="container" style={{ paddingTop: 100 }}>
          <img src={userData.avatar || `https://robohash.org/smart%20students`} />
          <h1>{userData.fullName} {userData.isBan ? '🔴' : '🟢'}</h1>
          <div className="info">
            <h3 className="info-title">About me</h3>
            <div className="horizontal-line"></div>
            <ul>
              <li>ID: <b>{userData._id}</b></li>
              <li>Класс: <b>{userData.age || 16}</b></li>
              <li>Рейтинг: <b>{userData.rating}</b></li>
              <li>Роль: <b>{userData.role}</b></li>
              <li>
                Участвует с{' '}
                <b>
                  {new Date(userData.createdAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </b>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: "300px" }}></div>
    </section>
  );
}