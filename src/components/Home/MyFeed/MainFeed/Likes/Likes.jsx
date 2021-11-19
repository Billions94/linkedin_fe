import { useState, useEffect } from "react";
import { url, me } from "../../../index";
import "./styles.css";

const Likes = ({ reversedFeed, fetchFeed, defaultLikes, onChange, postID }) => {

    const [likes, setLikes] = useState(defaultLikes)
    const likePost = likes.includes(me)

    const multiTask = () => {
          addLike()
        if(likePost){
            setLikes(likes.filter(id => id !== me))
        } else{
            setLikes([...likes, me])
        }
        onChange&&onChange(likes)
    }

    useEffect(() => {
        onChange&&onChange(likes);
      },[likePost])

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
          fetchFeed()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <b>
        <button onClick={(e) => multiTask()} 
        color={`${likePost}` ? 'primary' : 'transparent'} 
        className="btn btn-primary actuall-feed-h5">
          <i className="bi text-muted bi-hand-thumbs-up"></i>&nbsp;{" "}
          {<span className="text-muted">Like{`${likes.length}`}</span>}
        </button>{" "}
      </b>
    </>
  );
};

export default Likes;
