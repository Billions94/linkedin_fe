const {  REACT_APP_ME, REACT_APP_URL, REACT_APP_USER } = process.env;

export const me = REACT_APP_ME;
export const url = REACT_APP_URL;
export const currentUser = REACT_APP_USER;


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

// DELETE POST
export const deletePost = async (id, fetchFeed) => {
  try {
    const response = await fetch(url +`/posts/${id}`, {
      method: "DELETE",
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
