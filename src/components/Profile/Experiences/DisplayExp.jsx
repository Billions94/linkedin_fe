import ExpPicModal from "./ExpPicModal";
import PutExExp from "./PutExExp";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Modal from "./AddExperience";
import { postTimer, url } from "../../../Lib/index.js";

const DisplayExp = ({ user, token, me }) => {
  console.log(user);

  const [data, setData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [picExp, setPicExp] = useState(false);
  const [expId, setExpId] = useState("");

  const fetchExp = async () => {
    try {
      const response = await fetch(url + `/users/${user.userName}/experiences`);

      const exp = await response.json();
      console.log("================> ", exp);
      const newExp = exp.exp;
      setData(newExp);
      // console.log("================", newExp);
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchExp();
  }, [user]);

  //fetchExp();

  console.log("======>> ", data);
  return (
    <>
      {user._id === me && (
        <Modal
          user={user.userName}
          fetchExp={fetchExp}
          lgShow={lgShow}
          setLgShow={setLgShow}
          expId={expId}
          setExpId={setExpId}
        />
      )}
      {data.map((exp) => (
        <>
          {user._id === me && (
            <ExpPicModal
              expId={expId}
              userName={exp.userName}
              picExp={picExp}
              setPicExp={setPicExp}
              fetchExp={fetchExp}
            />
          )}
          <hr />
          <Row key={exp._id} className="text-left">
            <Col md={3}>
              <img src={exp.image} width="100" />
            </Col>
            <Col md={8}>
              <h6>{exp.role}</h6>
              <p>{exp.company}</p>
              <p>
                {postTimer(exp.startDate)} - {postTimer(exp.endDate)}
              </p>
              <p>{exp.area}</p>
              <br />
              <p>{exp.description}</p>
            </Col>
            {user._id === me && (
              <Col md={1}>
                <button
                  onClick={() => {
                    PutExExp(
                      exp._id,
                      exp.userName,
                      expId,
                      setExpId,
                      lgShow,
                      setLgShow
                    );
                  }}
                  className="profile-button pencil-button"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  onClick={() => {
                    setPicExp(true);
                    PutExExp(
                      exp._id,
                      exp.userName,
                      expId,
                      setExpId,
                      null, // lgShow,
                      null // setLgShow
                    );
                  }}
                  className="profile-button pencil-button"
                >
                  <i class="bi bi-image"></i>
                </button>
              </Col>
            )}
          </Row>
        </>
      ))}{" "}
    </>
  );
};

export default DisplayExp;
