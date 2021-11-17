import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { url, currentUser } from "../../index"
import "../../styles.css"

const POSTModal = ({ smShow, setSmShow, fetchFeed, token }) => {
  console.log('i am the fetch feed',fetchFeed )

  const [text, setText] = useState({ text: "" });
  const [image, setImage] = useState([])

  const newPost = async (e) => {
    e.preventDefault(e);
    try {
      const response = await fetch(url + `/posts/` + currentUser,
        {
          method: "POST",
          body: JSON.stringify(text),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let post = await response.json();
        console.log(`this is the post`,post);

        try {
          let formData = new FormData();
          formData.append("image", image);
        
          const response = await fetch(url + `/posts/${post._id}/upload`,
        
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: token,
              },
            }
          );
         
          if (response.ok) {
            console.log(response);
        
            fetchFeed();
            setImage(false);
            setText({text: ''})
            fetchFeed()
            setSmShow(false);

          } else {
            console.log(`wow... that wasn't supposed to happen... Error`);
            alert(`Woops we lost your data in the void .. try refreshing`);
          }
        } catch (error) {
          console.error(error);
        }
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
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Create a post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="#1">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What do you want to talk about?"
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
            <Form.Group className="mb-3" controlId="#1">
              <Form.Control type="file" onChange={(e)=> setImage(e.target.files[0])} />
              </Form.Group>
                
              <Button
                variant="primary"
                type="submit"
                className="rounded-pill"
                onClick={(e) => newPost(e)}
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

export default POSTModal;
