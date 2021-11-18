import ActualFeed from "./ActualFeed";
import StartAPost from "./StartAPost";
import { useState, useEffect } from "react";
import { url } from "../../../index";
import "./styles.css";
import PUTModal from "./PUTModal";
import POSTPic from "./POSTPic";


const MainFeedSection = ({ user }) => {
  let [feed, setFeed] = useState([]);
  const [smShow, setSmShow] = useState(false);

  const [smShowPUT, setSmShowPUT] = useState(false);
  const [putPost, setPutPost] = useState("");
  const [pic, setPic] = useState(false);
  const fetchFeed = async () => {
    try {
      const response = await fetch(url + `/posts/`);

      if (response.ok) {
        const exp = await response.json();
        console.log("==========================>", exp.posts);
        let slicedFeed = exp.posts.reverse().slice(0, 7);
        setFeed(slicedFeed);
        console.log("=======================>", slicedFeed);
      }

    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchFeed();
    console.log(feed);
  }, []);


  return (
    <>
      <StartAPost
        smShow={smShow}
        setSmShow={setSmShow}
        fetchFeed={fetchFeed}
        user={user}
      />
      <br />
      <ActualFeed
        user={user}
        reversedFeed={feed}
        fetchFeed={fetchFeed}
        smShowPUT={smShowPUT}
        setSmShowPUT={setSmShowPUT}
        putPost={putPost}
        setPutPost={setPutPost}
        pic={pic}
        setPic={setPic}
      />

      <PUTModal
        smShowPUT={smShowPUT}
        setSmShowPUT={setSmShowPUT}
        fetchFeed={fetchFeed}
        putPost={putPost}
      />
      <POSTPic fetchFeed={fetchFeed} pic={pic} setPic={setPic} id={putPost} />

    </>
  );
};

export default MainFeedSection;
