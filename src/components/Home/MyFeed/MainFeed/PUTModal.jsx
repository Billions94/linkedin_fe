import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { url } from "../../index";
import "../../styles.css";

const PUTModal = ({ smShowPUT, setSmShowPUT, fetchFeed, putPost }) => {
  const [text, setText] = useState({ text: "" });

  console.log("i am the id", putPost);

  const updatePost = async (e) => {
    e.preventDefault(e);
    try {
      const response = await fetch(url + `/posts/${putPost}`, {
        method: "PUT",
        body: JSON.stringify(text),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
        console.log("Update successfully");
        fetchFeed();
        setText({ text: "" });
        setSmShowPUT(false);
      } else {
        console.log(text);

        console.log(`wow... that wasn't supposed to happen... Error`);
        alert(`Woops we lost your data in the void .. try refreshing`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setText(text);
    console.log(text);
  }, [text]);

  return (
    <>
      <Modal
        show={smShowPUT}
        onHide={() => setSmShowPUT(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="#1">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What do you ant to talk about?"
                // name="description"
                value={text.text}
                onInput={(event) =>
                  setText({ ...text, text: event.target.value })
                }
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
                onClick={(e) => updatePost(e)}
              >
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PUTModal;
