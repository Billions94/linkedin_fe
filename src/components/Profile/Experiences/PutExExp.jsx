import { fetchSinglUserExp } from "./index";

const PutExExp = async (id, user, lgShow, setLgShow, expId, setExpId) => {
  const url = `http://localhost:3001/${user}/experiences/${id}`;
  console.log(id, user);
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
