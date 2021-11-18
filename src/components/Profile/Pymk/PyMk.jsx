import { useState, useEffect } from "react";
import { fetchInfo } from "./index";
import { Link } from "react-router-dom";
import { url } from "./index";
import "./styles.css";
import { url } from "../../../Lib";

const PyMk = ({ refresh, setRefresh }) => {
  const [data, setData] = useState([]);

  const myUrl = `${url}/users`;


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInfo(url + '/users');
      const newData = data.users;
      setData(newData);
      console.log(newData);
    };
    fetchData();
  }, []);

  console.log(`hey it's me`, data);

  const slicedData = data.slice(0, 6);

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
                <button class="btn btn-primary pymkbtn text-muted ">
                  <span className="pymkbtnspan">Message</span>
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
