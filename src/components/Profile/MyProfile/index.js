const {  REACT_APP_ME, REACT_APP_URL } = process.env;

export const me = REACT_APP_ME;
export const url = REACT_APP_URL;

// FETCH USER PROFILES
export const fetchInfo = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = response.json();
      console.log(`Here is your data`, data);
      return data;
    } else {
      console.log(`Ooops we got an error while fetching response`);
    }
  } catch (error) {
    console.error(error);
  }
};


