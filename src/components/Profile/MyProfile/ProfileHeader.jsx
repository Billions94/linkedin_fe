import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import { Col, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
import { url, me } from "./index";
import "./styles.css";

const MyJumbotron = ({ identification, user, setRefresh, refresh }) => {
  console.log("WTF HAHAHAH", user);

  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const target = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${url}/users`);
      if (response.ok) {
        const data = await response.json();
        console.log("i am the header data ", data);
        setData(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", image);

      const response = await fetch(`${url}/users/${me}/upload`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("updated");
        fetchUsers()

        setShow(false);
        setRefresh(!refresh)
      } else {
        console.log();

        console.log(`wow... that wasn't supposed to happen... Error`);
        alert(`Woops we lost your data in the void .. try refreshing`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const PDFhref = `${url}/users/${user._id}/CV`;

  return (
    <>
      <Jumbotron
        fluid
        className="rounded-lg bg-white p-0 jumbotronPadding"
        id="jumbotron-banner">
        <Row>
          <img
            onClick={() => setShow(true)}
            id="profile-pic"
            src={user.image}
            alt="ProfilePicture"
            width="130"
            height="130"/>
          <div>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              aria-labelledby="example-modal-sizes-title-sm">
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Add an image to your post
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="#1">
                    <Form.Control
                      type="file"
                      onChange={target}
                      rows={3}
                      placeholder="What do you want to talk about?"
                      // name="description"

                      id="description"
                      rows="4"
                      cols="81"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      type="submit"
                      className="rounded-pill"
                      onClick={(e) => submitImage(e)}
                    >
                      Post
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </Row>
        <Row className="p-2" style={{ marginTop: "250px" }}>
          <Col className="text-left ">
            <h3 className="nameHeader">
              {user.name} {user.surname}
            </h3>
            <h6 className="mb-0">{user.job}</h6>
            <p className="mb-1">{user.area}</p>
            <p className="mb-0">{user.bio}</p>
            <br />
            <p>
              {!user.friends ? null : <h6 className='text-primary'>{`${user.friends.length}`} connection</h6>}
              
              <Button variant="primary" className="jumbobtn-open-to">
                Open to
              </Button>
              <Button variant="white" className="jumbobtn text-muted ml-2">
                Add section
              </Button>
              <Button variant="white" className="jumbobtn text-muted ml-2">
                More
              </Button>
            </p>
            <p>
              <a href={PDFhref}>
                <Button variant="white" className="jumbobtn text-muted ml-2">
                  Download PDF
                </Button>
              </a>
            </p>

            {identification === "me" ? (
              <div className="opened-to-work text-left p-2">
                <div className="mb-0">
                  <b className="text-dark jumbo-a">
                    Show recruiters you’re open to work
                  </b>
                  <br />
                  <span className="text-dark jumbo-a">
                    you control who sees this
                  </span>
                  <br />
                  <a
                    href=""
                    style={{ color: "rgb(33, 93, 172)", cursor: "pointer" }}
                  >
                    Get started
                  </a>
                </div>
              </div>
            ) : (
              <></>
            )}
          </Col>
          <Col className=" d-flex-row text-right justify-content-right">
            {identification === "me" ? (
              <ProfileSettings
                user={user}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            ) : (
              <></>
            )}
            <div className="d-flex eduandexp">
              <div className=" mt-1 mr-5 d-flex-row align-items-center">
                <img
                  className="mr-2"
                  src="https://strive.school/favicon.ico"
                  width="25"
                />
                <b> Strive School</b>
              </div>
              <div className=" mt-1 mr-5 d-flex-row align-items-center">
                <img
                  className="mr-2"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1P8Bkt8I5AyDwCNPCaueTGsgvn7xYOpdyT7wapupWYEVGcUqmBrJzAqHQL-3Jy3sND2k&usqp=CAU"
                  width="25"
                />
                <b>Amazon</b>
              </div>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default MyJumbotron;
