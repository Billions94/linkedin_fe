import "./styles.css";
import { Dropdown, Accordion, Image, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { url } from "../../../index";
import { postTimer } from "../../../../../Lib";

const Comments = ({ comment, user }) => {
  const [comments, setComments] = useState({
    text: ""
  });

  const [data, setData] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        url + `/posts/6193e2d8527d64e241a3d328/comments`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("comments data", data.comments);
        const commentData = data.comments.reverse();
        setData(commentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const response = await fetch(url + `/posts/6193e2d8527d64e241a3d328/comments`, {
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
          onChange={(e) => setComments({ ...comments, text: e.target.value })}
          placeholder="start typing to share your thoughts...."
        />
      </div>
      <div className="mar-top clearfix mt-2 mb-2">
        {!comments.text ? null : (
          <button className="btn btn-sm btn-dark postCmBtn"
              onClick={(e) => postComment(e)}>
            <i className="fa fa-pencil fa-fw" /> Post
          </button>
        )}
      </div>
      {data && (
        <div className='mb-2'>
          {comment.map((c) => (
            <>
              <div className="d-flex col-12">
                <div>
                  <Image
                    className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src={user.image}
                    alt="Image Description"
                  />
                </div>
                <div className="cAndRDiv cAndR position-relative mb-1 ">
                  <div
                    style={{
                      borderBottom: "1px solid rgb(216, 215, 215)",
                      fontSize: "12px",
                    }}
                    className="text-muted  mb-2"
                  >
                     <div className='text-right'>{postTimer(c.createdAt)}</div>
                  </div>
                  <div
                    className="text-dark mt-0 mb-2"
                    style={{ fontSize: "18px", lineHeight: "12px" }}
                  >
                    <span className='text-left'>{user.name} {user.surname}</span>
                  </div>
                  <div
                    style={{ fontSize: "16px" }}
                    className=" cAndR mb-2 ml-5"
                  >
                    {c.text}
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



