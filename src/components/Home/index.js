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

// DELETE POST

export const deletePost = async (id, fetchFeed) => {
  const url = `http://localhost:3001/posts/${id}`;

  console.log(token);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    if (response.ok) {
      fetchFeed();

      console.log("Deleted successfully");
    } else {
      alert("Ooops we got an error while fetching response");
    }
  } catch (error) {
    console.error(error);
  }
};

// Post time
export const postTimer = (x) => {
    const postedDateISO = x;
    const postedDate = new Date(postedDateISO).getTime();
    const dateToday = new Date().getTime();
    const milliseconds = Math.abs(dateToday - postedDate).toString();
  
    const minutes = parseInt(milliseconds / 1000 / 60);
    const hours = parseInt(minutes / 60);
    const days = parseInt(hours / 24);
    const weeks = parseInt(days / 7);
    let date;
  
    if (weeks > 0) {
      date = `${weeks}w`;
    } else if (days > 0) {
      date = `${days}d`;
    } else if (days == 0 && hours >= 1) {
      date = `${hours}hr`;
    } else if (hours < 1) {
      date = `${minutes}min`;
    }
    return date;
  };
