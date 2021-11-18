import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import { Accordion, Card, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import POSTPic from "./POSTPic";
import { useEffect, useState } from "react";
import PUTModal from "./PUTModal";
import { Link } from "react-router-dom";
import { postTimer } from "../../index";
import { deletePost, me } from "../../index";
import "../../styles.css";
import Comments from "./Comments/Comments";

const ActualFeed = ({
  user,
  reversedFeed,
  fetchFeed,
  smShowPUT,
  setSmShowPUT,
  putPost,
  setPutPost,
}) => {
  // const [smShow, setSmShow] = useState(false);
  const [pic, setPic] = useState(false);
  const [comment, setComment] = useState(false);
  console.log("here goes the reversed feed", reversedFeed);
  return (
    <>
      <hr className="mt-0" />
      {!reversedFeed ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        reversedFeed.map((elem) => (
          <div key={elem._id} id={elem._id}>
            <div className="section-container pt-2 pb-0 mb-2 list-group list-group-flush">
              <div className=" d-flex justify-content-between list-pad1 ">
                <h6 style={{ fontSize: "12px" }}>
                  Posted {postTimer(elem.updatedAt)} ago
                </h6>
                <Col className="text-right">
                  {elem.user._id == me && (
                    <>
                      {/* <PUTModal
                        fetchFeed={fetchFeed}
                        reversedFeed={reversedFeed}
                        smShowPUT={smShowPUT}
                        setSmShowPUT={setSmShowPUT}
                        id={elem._id}
                        token={token}
                      /> */}
                      <POSTPic
                        fetchFeed={fetchFeed}
                        pic={pic}
                        setPic={setPic}
                        id={elem._id}
                      />

                      <div className=" d-flex">
                        <Dropdown className="dropdowntext actuallFeedD mr-5 ">
                          <Dropdown.Toggle
                            style={{ marginLeft: "400px", marginTop: "-24px" }}
                            className="btn btn-dark reply remove"
                          >
                            <img
                              className="lrdimg"
                              width="17px"
                              src="https://img.icons8.com/ios-filled/50/000000/ellipsis.png"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="w-10"
                            style={{
                              padding: "18px",
                              borderRadius: "25px",
                              border: "1px solid rgb(216, 215, 215)",
                            }}
                          >
                            <br />

                            <a href="#" className="text-dark">
                              <div className="d-flex experiment">
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="mr-0"
                                >
                                  <img
                                    className="lrdimg"
                                    width="17px"
                                    src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png"
                                  />
                                </div>
                                <div
                                  onClick={() => {
                                    setSmShowPUT(true);
                                    setPutPost(elem._id);
                                  }}
                                  className="deleteBlog text-decoration-underline"
                                  style={{
                                    marginLeft: "13px",
                                    cursor: "pointer",
                                  }}
                                >
                                  edit
                                </div>
                              </div>
                            </a>

                            <a href="#" className="text-dark">
                              <div className="d-flex">
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="mr-0"
                                >
                                  <img
                                    className="lrdimg"
                                    width="17px"
                                    src="https://img.icons8.com/ios-filled/50/000000/upload--v1.png"
                                  />
                                </div>
                                <div
                                  onClick={() => {
                                    setPic(true);
                                  }}
                                  className="deleteBlog text-decoration-underline"
                                  style={{
                                    marginLeft: "13px",
                                    cursor: "pointer",
                                  }}
                                >
                                  upload Pic
                                </div>
                              </div>
                            </a>

                            <a href="#" className="text-dark">
                              <div className="d-flex">
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="mr-0"
                                >
                                  <img
                                    className="lrdimg"
                                    width="17px"
                                    src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                                  />
                                </div>
                                <div
                                  onClick={() =>
                                    deletePost(elem._id, fetchFeed)
                                  }
                                  className="deleteBlog text-decoration-underline"
                                  style={{
                                    marginLeft: "13px",
                                    cursor: "pointer",
                                  }}
                                >
                                  delete
                                </div>
                              </div>
                            </a>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </>
                  )}
                </Col>{" "}
              </div>
              <hr className="actuall-feed-hr mt-0" />
              <div className=" d-flex list-pad2 ">
                <Link
                  to={"/profile/" + elem.user._id}
                  className="text-left text-dark  text-decoration-none"
                >
                  <div>
                    <img
                      className="mr-2 rounded-pill"
                      src={elem.user.image}
                      width="50"
                      height="50"
                      //   style={{ borderRadius: "50%" }}
                    />{" "}
                  </div>
                </Link>

                <div>
                  <Link
                    to={"/profile/" + elem.user._id}
                    className="text-left text-dark  text-decoration-none"
                  >
                    <b className="text-left">
                      {elem.user.name} {elem.user.surname}
                    </b>
                  </Link>

                  <span
                    className="text-left text-muted d-block"
                    style={{ fontSize: "12px", fontWeight: "500" }}
                  >
                    {elem.user.job}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-left mb-0 mt-2">{elem.text}</p>
              </div>
              <img
                className="img-fluid "
                src={elem.image}
                alt=""
                style={{ width: "100%" }}
              />

              <hr className="actuall-feed-hr mt-0" />
              <Row>
                <Col className="px-0 actuall-feed-interact">
                  <b>
                    <button className="btn btn-primary actuall-feed-h5">
                      <i className="bi text-muted bi-hand-thumbs-up"></i>&nbsp;{" "}
                      <span className="text-muted">Like</span>
                    </button>{" "}
                  </b>
                </Col>
                <Col className="px-0 actuall-feed-interact">
                  <b>
                    <button className="btn btn-primary actuall-feed-h5">
                      <i className="bi text-muted bi-chat-right-text"></i>&nbsp;{" "}
                      <span
                        className="text-muted"
                        onClick={(e) => setComment(true)}
                      >
                        Comment
                      </span>
                    </button>{" "}
                  </b>
                </Col>
                <Col className="px-0 actuall-feed-interact">
                  <b>
                    <button className="btn btn-primary actuall-feed-h5">
                      <i className="bi text-muted bi-arrow-90deg-right"></i>
                      &nbsp; <span className="text-muted">Share</span>
                    </button>{" "}
                  </b>
                </Col>
                <Col className="px-0  actuall-feed-interact">
                  <b>
                    <button className="btn btn-primary actuall-feed-h5">
                      <img
                        src="https://img.icons8.com/ios-filled/50/000000/paper-plane.png"
                        width="22"
                      />
                      &nbsp; <span className="text-muted">Send</span>
                    </button>{" "}
                  </b>
                </Col>
                {elem.user._id === elem._id ? null : (
                  <Comments postID={elem._id} user={user} />
                )}
              </Row>
            </div>
          </div>
        ))
      )}
    </>
  );
};
export default ActualFeed;
