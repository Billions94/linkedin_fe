import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { url } from "../../../Lib/index";

const POSTpic = ({ expId, userName, picExp, setPicExp, fetchExp }) => {
  const [imageExp, setImageExp] = useState(null);
  console.log("EXPIMAGE ID : ", expId);
  const target = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setImageExp(e.target.files[0]);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", imageExp);

      const response = await fetch(
        url + `/users/${userName}/experiences/${expId}/upload`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        console.log(response);
        fetchExp();
        setPicExp(false);
      } else {
        console.log();

        console.log(`wow... that wasn't supposed to happen... Error`);
        //alert(`Woops we lost your data in the void .. try refreshing`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={picExp}
        onHide={() => setPicExp(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add an image
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
    </>
  );
};

export default POSTpic;
