const { REACT_APP_TOKEN, REACT_APP_ME } = process.env;

export const token = REACT_APP_TOKEN;
export const me = REACT_APP_ME;

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
