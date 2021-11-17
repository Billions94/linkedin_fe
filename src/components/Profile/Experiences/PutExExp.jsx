import { fetchSinglUserExp } from "./index";

const PutExExp = async (id, userName, lgShow, setLgShow, expId, setExpId) => {
  const url =
    process.env.REACT_APP_URL + `/users/${userName}/experiences/${id}`;
  console.log(id, userName);

  try {
    let exp = await fetchSinglUserExp(url);
    console.log(exp);

    setLgShow(true);
    setExpId(exp._id);
  } catch (error) {
    console.error(error);
  }
};

export default PutExExp;
