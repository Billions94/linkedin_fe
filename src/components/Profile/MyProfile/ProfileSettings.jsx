import { Button, Modal, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { me, url } from "./index";
import "./styles.css";

const ProfileSettings = ({ user, setRefresh, refresh, pic, setPic }) => {
  const [lgShow, setLgShow] = useState(false);
  const [name, setName] = useState("");
  const [settings, setSettings] = useState(user);
 

  const updateUserSettings = async (e) => {
    e.preventDefault(e);
    try {
      const response = await fetch(`${url}/users/${me}`, {
        method: "PUT",
        body: JSON.stringify(settings),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setLgShow(false);
        setRefresh(!refresh);
      } else {
        console.log(settings);

        console.log(`wow... that wasn't supposed to happen... Error`);
        alert(`Woops we lost your data in the void .. try refreshing`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSettings(user);
  }, [user]);

  return (
    <>
      <button
        className="profile-button pencil-button"
        onClick={() => setLgShow(true)}
      >
        <i class="bi bi-pencil"></i>
      </button>
      <div>
        <Modal
          id="profile-settings"
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          className="p-0 d-flex" 
        >
          <Modal.Header closeButton id="profile-settings" >
            <Modal.Title id="example-modal-sizes-title-lg">
              Edit intro
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0" style={{ width: "710px" }}>

          <small className="text-muted px-4 mb-5">* indicates required fields</small>

          <Form className="px-4 mt-4" style={{ height: "460px", overflow: "auto" }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-muted">First name *</Form.Label>
                <Form.Control
                  type="text"
                  onInput={(event) =>
                    setSettings({ ...settings, name: event.target.value })
                  }
                  value={settings.name}
                  placeholder="Enter your first name"/>

                <Form.Label className="text-muted mt-4">Last name *</Form.Label>
                <Form.Control
                  type="text"
                  onInput={(event) =>
                    setSettings({ ...settings, surname: event.target.value })
                  }
                  value={settings.surname}
                  placeholder="Enter your surname"/>

                <Form.Label className="text-muted mt-4">Additional name </Form.Label>
                <Form.Control
                  type="text"
                  onInput={(event) =>
                    setSettings({ ...settings, surname: event.target.value })
                  }
                  value={settings.title}
                  placeholder="Enter your surname"/>


                <h6 className="passive_text mt-4">
                  <AddIcon />
                  pronunciation
                </h6>

                <p>This can only be added using our mobile app.</p>

                <div className="model_Pronouns_input mt-4">
                  <Form.Label className="mt-4">Pronouns </Form.Label>
                  <Form.Control as="select">
                    <option>Please select</option>
                    <option>He/Him</option>
                    <option>She/Her</option>
                    <option>They/Them</option>
                  </Form.Control>
                  <Form.Text className="text-muted">
                   Let others know how to refer to you.
                  </Form.Text>

                  <a className='font-weight-bold' href='#'>Learn More</a>

                  <div className='mt-3'>
                  <button type='button' className='btn btn-white mt-2 visibleToAllBtn'>
                    <RemoveRedEyeIcon className='text-muted'/>
                      <span className='ml-2 text-muted'>All LinkedIn members</span>
                  </button>
                  </div>
                </div>

                <Form.Label className="text-muted mt-4">Headline *</Form.Label>
                <Form.Control
                value={settings.job}
                onChange={(e) => setSettings({ ...settings, job: e.target.value })}/>

                  <div className='mt-3'>  
                    <button type='button' className='btn btn-white mt-2 '>
                      <AddIcon />
                      Add current position.
                    </button>
                  </div>

                <Form.Label className="text-muted mt-4">Email address *</Form.Label>
                <Form.Control
                  type="email"
                  onInput={(event) =>
                    setSettings({ ...settings, email: event.target.value })
                  }
                  value={settings.email}
                  placeholder="Enter email"/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>

                <Form.Label className="text-muted mt-4">Bio *</Form.Label>
                <Form.Control
                  type="textarea"
                  onInput={(event) =>
                    setSettings({ ...settings, bio: event.target.value })
                  }
                  value={settings.bio}
                  placeholder="Tell the world about yourself"/>

                <Form.Label className="text-muted mt-4">Position Title *</Form.Label>
                <Form.Control
                  type="text"
                  onInput={(event) =>
                    setSettings({ ...settings, title: event.target.value })
                  }
                  value={settings.title}
                  placeholder="What position do you hold?"/>

                <Form.Label className="text-muted mt-4">Area *</Form.Label>
                <Form.Control
                  type="text"
                  onInput={(event) =>
                    setSettings({ ...settings, area: event.target.value })
                  }
                  value={settings.area}
                  placeholder="Where are you based?"/>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="modal-save"
              onClick={(e) => updateUserSettings(e)}>
              <span className='span-md-btn'>Save</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default ProfileSettings;
