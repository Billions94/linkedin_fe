import { fetchSinglUserExp } from "./index";

const PutExExp = async (id, userName, expId, setExpId, lgShow, setLgShow) => {
  const url =
    process.env.REACT_APP_URL + `/users/${userName}/experiences/${id}`;

  console.log(id, userName);
  console.log("HERE ARE THE FUCKIN STATES: ", lgShow, setLgShow);

  try {
    let exp = await fetchSinglUserExp(url);
    console.log(exp);

    if (lgShow === false) {
      setLgShow(true);
    }
    setExpId(exp._id);
  } catch (error) {
    console.error(error);
  }
};

export default PutExExp;
