import { fetchSinglUserExp } from "./index";

const PutExExp = async (id, userName, lgShow, setLgShow, expId, setExpId) => {
  const url = `http://localhost:3001/users/${userName}/experiences/${id}`;
  console.log("URL for getting single user exp: ", url);
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
