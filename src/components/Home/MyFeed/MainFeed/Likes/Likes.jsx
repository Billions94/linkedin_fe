import { useState, useEffect } from "react";
import { url, me } from "../../../index";
import "./styles.css";

const Likes = ({ postID }) => {

    const user = {
        userId: me
    }

  const addLike = async () => {
    try {
      const response = await fetch(url + `/posts/${postID}/likes`, {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
      });
      if(response.ok){
          console.log('post liked')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <b>
        <button onClick={(e) => addLike()} className="btn btn-primary actuall-feed-h5">
          <i className="bi text-muted bi-hand-thumbs-up"></i>&nbsp;{" "}
          <span className="text-muted">Like</span>
        </button>{" "}
      </b>
    </>
  );
};

export default Likes;
