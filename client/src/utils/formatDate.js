const formatDate = (date) => {
  let formattedDate;
  if (date) {
    const split = date.split('-');

    const day = split[2];
    const month = split[1];
    const year = split[0];

    formattedDate = `${month}/${day}/${year}`;
  }
  return formattedDate;
};

export default formatDate;
