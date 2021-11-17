const { REACT_APP_TOKEN, REACT_APP_ME } = process.env;

export const token = REACT_APP_TOKEN;
export const me = REACT_APP_ME;

// FETCH USER PROFILES
export const fetchInfo = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });
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


