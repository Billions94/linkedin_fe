import { useState, useEffect } from "react";
import { fetchInfo, url } from "../../index";
import { Link } from "react-router-dom";


const AddFeedUsers = (props) => {
  const [data, setData] = useState([]);
  const [randomSelection, setRandomSelection] = useState([]);
  const myUrl = url + `/users`;

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchInfo(myUrl);
     const newData = userData.users
      setData(newData);
      randomize(newData)

      console.log(newData);
    };
    fetchData();
  }, []);

  console.log(`FeedUsers!!`, data);

  console.log('===============> bigBoss rnd slc',randomSelection);


  const randomize = async (newData) => {
      let selection = []
    for (let i = 0; i < 3; i++) {
      let randomInt = Math.floor(Math.random() * newData.length);
      const currentUser = newData[randomInt];
         selection.push(currentUser)
      console.log("3 Random Users", randomSelection);
    }
    setRandomSelection(selection)

  };

 
 return (
    <>
      {data && randomSelection ? (
        randomSelection.map((person) => (
          <li className="d-flex pymk-li" key={person._id}>
            <div class="d-flex-column align-items-center">
              <Link to={"/profile/" + person._id}>
                <a className="d-flex pymk-a">
                  <img
                    className="roundpic"
                    src={person.image}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <div class="ml-2">
                    <h3 className="text-dark m-0 text-left pymkh6p2">
                      <strong>{person.name}</strong>{" "}
                      <strong>{person.surname}</strong>
                    </h3>
                    <p className="text-muted title-resize mb-0 text-left  pymkh6p2">
                      {person.job}
                    </p>
                  </div>
                </a>
              </Link>
              <div className="mb-2 pymkdiv2">
                <button class="btn btn-primary pymkbtn text-muted ml-4">
                  <span className="pymkbtnspan2">
                    <i className="bi bi-plus-lg"></i> Follow
                  </span>
                </button>
              </div>
            </div>
          </li>
        ))
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
};

export default AddFeedUsers;


