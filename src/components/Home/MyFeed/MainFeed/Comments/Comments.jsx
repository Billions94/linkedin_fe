import "./styles.css";
import { Dropdown, Accordion, Image, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { url, me } from "../../../index";
import { postTimer } from "../../../../../Lib";

const Comments = ({ postID, user }) => {

  console.log('i am the user info ', user.name)
  const [comments, setComments] = useState({
    text: "",
    userName: user.userName,
    user: user._id,
    image: user.image
  });

  const [updateComment, setUpdateComment] = useState({
    text: ""
  })


  console.log(comments.userName)
  console.log(comments.user)

  const [data, setData] = useState(null);

  // For Retriving Users 

  const fetchComments = async () => {
    try {
      const response = await fetch(
        url + `/posts/${postID}/comments`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("comments data", data);
        const commentData = data.comments.reverse();
        setData(commentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const response = await fetch(url + `/posts/${postID}/comments`, {
        method: "POST",
        body: JSON.stringify(comments),
        headers: {
          "Content-Type": "application/json",
        },
      })
       if (response.ok){
        fetchComments()
        setComments({
          text: ""
        })
       }
    } catch (error) {
      console.log(error)
    }
  }

  const editComment = async (c) => {
    try {
      const response = await fetch(url + `/posts/${postID}/comments/${c._id}`, {
        method: "PUT",
        body: JSON.stringify(updateComment),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        console.log("Comment updated");
        fetchComments()
        setUpdateComment({
          text: ""
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (c) => {
    console.log('its cccccccccc', c._id)
    try {
      const response = await fetch(url + `/posts/${postID}/comments/${c._id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log("Comment deleted");
        fetchComments()
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log("data array ", data);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className="commentArea d-flex mb-2">
        <img src={user.image} alt="" width="35px" className="roundpic" />
        <textarea
          className="form-control shareComment"
          type="textarea"
          rows={2}
          value={comments.text}
          onChange={(e) => setComments({...comments,
            text: e.target.value,
            userName: user.name,
            user: user._id,
            image: user.image })}
          placeholder="start typing to share your thoughts...."
        />
      </div>
      <div className="mar-top clearfix mt-2 mb-2">
        {!comments.text ? null : (
          <button className="btn btn-sm btn-dark postCmBtn"
              onClick={(e) => postComment()}>
            <i className="fa fa-pencil fa-fw" /> Post
          </button>
        )}
      </div>
      {data && (
        <div className='mb-2'>
          {data.map((c) => (
            <>
              <div className="d-flex col-12">
                <div>
                  <Image
                    className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src={c.image}
                    alt="Image Description"
                  />
                </div>
                <div className="d-flex cAndRDiv cAndR position-relative mb-1 ">
                  <div
                    style={{
                      borderBottom: "1px solid rgb(216, 215, 215)",
                      fontSize: "12px",
                    }}
                    className="text-muted  mb-2"
                  >
                     <div className='t postTime'>{postTimer(c.createdAt)}</div>

                  { c.user !== me ? null :       
                    <div className=" d-flex">
                   
                    <Dropdown className="dropdowntext ">
                      <Dropdown.Toggle
                        style={{ marginLeft: "400px", marginTop: "-24px" }}
                        className="btn btn-dark reply remove"
                      >
                        <img
                          className="lrdimg"
                          width="17px"
                          src="https://img.icons8.com/ios-filled/50/000000/ellipsis.png"/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className='w-10'
                        style={{
                          padding: "18px",
                          borderRadius: "25px",
                          border: "1px solid rgb(216, 215, 215)",
                        }}
                      >
                        <br />
                        <div className='experiment'>
                     <Dropdown className="dropdowntext">
                          <Dropdown.Toggle className="btn btn-dark remove">
                            {/* <div className='d-flex'> */}
                           {/* <div className='mr-2 editicon'>  */}
                          <img width="17px" 
                          className='mr-2 editicon'
                          src="https://img.icons8.com/ios-filled/50/000000/edit-chat-history.png"/>
                            {/* </div> */}
                            <a className='text-dark'>edit</a>
                            {/* </div> */}
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              borderRadius: "25px",
                              border: "1px solid rgb(216, 215, 215)",
                            }}
                          >
                            <textarea
                              className="mt-0 textAr"
                              value={updateComment.text}
                              onChange={(e) =>
                                setUpdateComment({ ...updateComment, text: e.target.value })
                              }
                              placeholder="update comment..."
                            />
                            <br />
                            {!updateComment.text ? null :
                              <button
                              style={{ borderRadius: "50px" }}
                              className="btn btn-dark nobtnshadow"
                              onClick={(e) => editComment(c)}>
                                send
                              </button>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                       </div>
                        
                    
                        <div className="d-flex">
                          <div style={{ cursor: "pointer" }} className="mr-0">
                            <img
                              className="lrdimg"
                              width="17px"
                              src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                            />
                          </div>
                          <div
                            onClick={(e) => deleteComment(c)}
                            className="deleteBlog text-decoration-underline"
                            style={{ marginLeft: "13px", cursor: "pointer" }}
                          >
                            delete
                          </div>
                      
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>}
      
                  </div>
                  <div
                    className="text-dark text-left mt-0 mb-2"
                    style={{ fontSize: "18px", lineHeight: "12px" }}
                  >
                    <small className='text-left commentUser'>{c.userName}</small>
                    <small className='text-left text-muted commentUserJob d-block mt-1'>{user.job}</small>
                  </div>
                  <div
                    style={{ fontSize: "16px" }}
                    className="mb-2 ml-5"
                  >
                    <p className='text-left commentText'>{c.text}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;



