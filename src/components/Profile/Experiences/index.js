const { REACT_APP_TOKEN, REACT_APP_ME } = process.env;

export const token = REACT_APP_TOKEN;
export const me = REACT_APP_ME;

// FETCH ALL USER EXPERIENCES
export const fetchUserExp = async (url) => {
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

//POST USER EXPERIENCE
export const postUserExp = async (url, e, exp) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(exp),
      headers: {
        Authorization: token,
      },
    });
    if (response.ok) {
      fetchUserExp(url);
    } else {
      console.log(`Ooops we got an error while fetching response`);
      //alert(`Ooops we got an error while fetching response`);
    }
  } catch (error) {
    console.error(error);
  }
};

// FETCH SINGLE EXPERIENCE
export const fetchSinglUserExp = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });
    if (response.ok) {
      const data = response.json();
      console.log(`Here is your single user EXPERIENCE: `, data);
      return data;
    } else {
      console.log(`Ooops we got an error while fetching response`);
    }
  } catch (error) {
    console.error(error);
  }
};

// PUT SINGLE EXPERIENCE
export const putSinglUserExp = async (url, exp) => {
  // e.preventDefault(e);
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(exp),
      headers: {
        Authorization: token,
      },
    });
    console.log(`experience response ------------`, response);
    if (response.ok) {
      fetchUserExp(url);
    } else {
      console.log(`Ooops we got an error while fetching response`);
    }
  } catch (error) {
    console.error(`we caught you`, error);
  }
};


// DELETE SINGLE EXPERIENCE
export const deleteSingleUserExp = async (user, expId, fetchExp, setLgShow) => {
    const url = `http://localhost:3001/users/${user}/experiences/${expId}`;
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization:token,
        },
      });
      if (response.ok) {
        fetchUserExp(url);
        console.log("Deleted successfully");
        fetchExp();
        setLgShow(false);
      } else {
        console.log(`Ooops we got an error while fetching response`);
        alert("Ooops we got an error while fetching response");
      }
    } catch (error) {
      console.error(error);
    }
  };