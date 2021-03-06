import { useState, useEffect } from "react";
import { fetchInfo, url, me } from "./index";
import { Link } from "react-router-dom";
import "./styles.css";


const PyMk = ({ refresh, setRefresh }) => {
  const [data, setData] = useState([]);

  const myUrl = `${url}/users`;

  const fetchData = async () => {
    const data = await fetchInfo(myUrl);
    const newData = data.users;
    setData(newData);
    console.log("i am the new data in users ", newData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(`hey it's me`, data);

  const slicedData = data.slice(0, 6);

  const newUser = data.map((user) => user._id);
  console.log("dopeboy", newUser);

  const user = {
    friendId: "61938acda61b1b4f0f90e754",
  };

  const addFriend = async () => {
    try {
      const response = await fetch(`${url}/users/${me}/friends`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("new friend added");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!data ? (
        <h1>Loading....</h1>
      ) : (
        slicedData.map((person) => (
          <li className="d-flex pymk-li" key={person._id}>
            <div class="d-flex-column align-items-center">
              <Link to={"/profile/" + person._id}>
                <a className="d-flex pymk-a">
                  <img
                    className="roundpic"
                    src={person.image}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <div class="ml-2">
                    <h3 className="text-dark m-0 text-left pymkh6p">
                      <strong>{person.name}</strong>{" "}
                      <strong>{person.surname}</strong>
                    </h3>
                    <p className="text-muted mb-0 text-left  pymkh6p">
                      {person.job}
                    </p>
                  </div>
                </a>
              </Link>
              <div className="mb-2  pymkdiv">
                <button
                  onClick={(e) => addFriend(e)}
                  class="btn btn-primary pymkbtn text-muted "
                >
                  <span className="pymkbtnspan">Connect</span>
                </button>
              </div>
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default PyMk;
