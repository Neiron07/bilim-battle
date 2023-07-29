import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function User() {
  let params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let userID = params.id;
    axios(`https://bilimjarys.online/identity/profile/${userID}`)
      .then((data) => {
        setUserData(data.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  return (
    <section>
      <div className="container flex-start">
        <img src={userData.avatar || `https://robohash.org/smart%20students`} alt="avatar" />
        <div className="info">
          <h1>{userData.fullName}</h1>
          <ul>
            <li><b>Возраст:</b> {userData.age || 16}</li>
            <li><b>Рейтинг:</b> {userData.rating}</li>
            <li><b>Роль:</b> {userData.role}</li>
            <li><b>BIO:</b> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio architecto nulla ad explicabo! Harum, ex maiores ullam fugiat hic quisquam doloribus magni in doloremque soluta velit, iusto, obcaecati eaque nam!</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
