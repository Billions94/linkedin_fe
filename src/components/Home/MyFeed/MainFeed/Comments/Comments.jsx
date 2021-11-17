import "./styles.css";
import { Dropdown, Accordion, Image, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { url } from "../../../index"
import { postTimer } from "../../../../../Lib";

const Comments = ({ user }) => {

  console.log('i am the reverse feed in the comments section', user)

  const [comments, setComments] = useState({
    text: "",
  });

  const [data, setData] = useState(null)

  const fetchComments = async () => {
    try {
      const response = await fetch(url + `/posts/6193e2d8527d64e241a3d328/comments`)
      if (response.ok){
        const data = await response.json()
        console.log('comments data', data.comments)
        const commentData = data.comments
        setData(commentData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('data array ', data)

 useEffect(() => {
  fetchComments()
 }, [])

  return (
    <>
    <div>
    {/* {
        data.map(c => (
          <>
          <h1>{c.text}</h1>
          </>
        ))
      } */}
    </div>
      <div className="commentArea d-flex mb-2">
        <img src={user.image} alt="" width="35px" className="roundpic" />
        <textarea
          className="form-control shareComment"
          type="textarea"
          rows={2}
          value={comments.text}
          onChange={(e) => setComments({ ...comments, text: e.target.value })}
          placeholder="start typing to share your thoughts...."
        />
      </div>
      <div className="mar-top clearfix mt-2 mb-2">
        {!comments.text ? null : (
          <button className="btn btn-sm btn-dark postCmBtn">
            <i className="fa fa-pencil fa-fw" /> Post
          </button>
        )}
      </div>
    </>
  );
};

export default Comments;

{
  /* <div className="px-0 actuall-feed-interact ml-3 d-flex justify-content-center">
                      <Accordion className="mt-3" defaultActiveKey="0" style={{ width: "100%" }}>
                      <Card style={{ border: "none" }}>
                        <Card.Header className="cardHeader">
                          <Accordion.Toggle
                            className="text-dark shareComment"
                            as={Button}
                            variant="link"
                            eventKey="0"
                          >
                            Show comments
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0" style={{ width: "100%" }}>
                          <div>
                            {        
                                <div>
                                  <Card.Header className="cardHeader">
                                    <div className="d-flex col-12">
                                      <div>
                                        <Image
                                          className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                                          src="https://source.unsplash.com/random/200x200?sig=1"
                                          alt="Image Description"
                                        />
                                      </div>
                                      <div className="cAndRDiv cAndR position-relative mb-1 ">
                                        <div
                                          style={{
                                            borderBottom: "1px solid rgb(216, 215, 215)",
                                            fontSize: "12px",
                                          }}
                                          className="text-muted mb-2"
                                        >
                                          Posted: 
                                        </div>
                                        <div
                                          className="text-dark mt-0 mb-2"
                                          style={{ fontSize: "18px", lineHeight: "12px" }}
                                        >
                                          
                                        </div>
                                        <div
                                          style={{ fontSize: "16px" }}
                                          className=" cAndR mb-2 ml-5"
                                        >
                                          
                                        </div>

                                      </div>
                                    </div>
                                    

                                    <div className="row d-flex align-content-space-between mb-5">
                                      <button className="btn btn-primary like">
                                        <img
                                          className="lrdimg"
                                          width="17px"
                                          src="https://img.icons8.com/dotty/50/000000/filled-like.png"
                                        />
                                      </button>

                                      <button
                                        className="btn btn-primary delete"
                                      
                                      >
                                        <img
                                          className="lrdimg"
                                          width="16px"
                                          src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                                        />
                                      </button>
                                    </div>
                                  </Card.Header>
                                </div>
                              }
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                
                </div> */
}
