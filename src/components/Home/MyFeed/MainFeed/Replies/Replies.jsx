import "./styles.css";
import { url, postTimer } from "../../../index";
import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import propsPass from "./propsPass";

const Replies = ({ replyID, user, postID, commentID, fetchComments }) => {
    console.log('iam am the reply ID', replyID)
  const [replies, setReplies] = useState({
    text: "",
    userName: user.userName,
    user: user._id,
    image: user.image,
  });

  const [data, setData] = useState(null);

  const getReplies = async () => {
    try {
      const response = await fetch(`${url}/posts/${commentID}/replies`);
      if (response.ok) {
        const data = await response.json();
        console.log("we are the replies", data.replies);
        const newData = data.replies.reverse();
        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  const postReply = async () => {
    try {
      const response = await fetch(
        `${url}/posts/${postID}/${commentID}/replies`,
        {
          method: "POST",
          body: JSON.stringify(replies),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("replied successfully");
        getReplies();
        setReplies({
          text: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReplies = async (reply) => {
      try {
          const response = await fetch(`${url}/posts/${commentID}/replies/${reply}`, {
            method: "DELETE",
          })

          if(response.ok){
              getReplies()
              console.log("deleted successfully");
          }

      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
      <div className="commentArea reply-section d-flex mb-2">
        <img src="{user.image} " alt="" width="35px" className="roundpic" />
        <textarea
          className="form-control shareComment"
          type="textarea"
          rows={2}
          onChange={(e) =>
            setReplies({
              ...replies,
              text: e.target.value,
              userName: user.name,
              user: user._id,
              image: user.image,
            })
          }
          placeholder="start typing to share your thoughts...."
        />
      </div>
      <div className="mar-top clearfix mt-2 mb-2">
        {!replies.text ? null : (
          <button
            onClick={(e) => postReply(e)}
            className="btn btn-sm btn-dark postCmBtn"
          >
            <i className="fa fa-pencil fa-fw" /> Post
          </button>
        )}
      </div>
      {data && (
        <div className="reply-section">
          {data.map((reply) => (
            <>
              <div className="d-flex col-12 mb-2">
                <div>
                  <Image
                    className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src={reply.image}
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
                    <div className=" postTimeReply">
                      {postTimer(reply.createdAt)}
                    </div>

                    <div
                      className="text-dark text-left mt-0 mb-2"
                      style={{ fontSize: "18px", lineHeight: "12px" }}
                    >
                      <small className="text-left commentUser">
                        {reply.userName}
                      </small>
                      <small className="text-left text-muted commentUserJob d-block mt-1">
                        {user.job}
                      </small>
                    </div>
                    <div style={{ fontSize: "16px" }} className="mb-2 ml-5">
                      <p className="text-left commentText">{reply.text}</p>
                    </div>
                    <button className='replyDel btn btn-warning' onClick={(e) => deleteReplies(reply._id)}>
                    <img className='replyDelImg' src="https://img.icons8.com/ios-filled/50/000000/waste.png" width='12px'/>
                    </button>
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

export default Replies;
