import ActualFeed from "./ActualFeed";
import StartAPost from "./StartAPost";
import { useState, useEffect } from "react";
import { url } from "../../index";
import "../../styles.css"

const MainFeedSection = ({ user }) => {
  let [feed, setFeed] = useState([]);
  const [smShow, setSmShow] = useState(false);

  const fetchFeed = async () => {
    try {
      const response = await fetch(url + `/posts/`);
     
      if(response.ok){ 
         const exp = await response.json();
         console.log('==========================>',exp.posts)
        let slicedFeed = exp.posts.reverse().slice(0, 7);
         setFeed(slicedFeed);
         console.log('=======================>',slicedFeed)
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
      <StartAPost smShow={smShow} setSmShow={setSmShow} fetchFeed={fetchFeed}  user={user}/>
      <br /> 
      <ActualFeed reversedFeed={feed} fetchFeed={fetchFeed} />

    </>
  );
};

export default MainFeedSection;
