function getFormattedDate(date) {
  let todayTime = new Date();
  if (date) {
    todayTime = new Date(date);
  }

  let month = todayTime.getMonth() + 1;
  let day = todayTime.getDate();
  let year = todayTime.getFullYear();

  return `${month}/${day}/${year}`;
}

function getSessionsCompleted(date) {
  if (!date) {
    date = getFormattedDate();
  }
  return localStorage.getItem(date) != null
    ? parseInt(localStorage.getItem(date), 10)
    : 0;
}
export default { getFormattedDate, getSessionsCompleted };
