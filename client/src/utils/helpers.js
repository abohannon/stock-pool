export const formatNumber = (number) => {
  if (typeof number === 'object' || typeof number === 'boolean' || !number) {
    throw new Error('Argument must be of type String or Number');
  }

  let num = number;

  if (typeof num === 'number') {
    num = number.toString();
  }

  const arr = num.split('');
  const length = arr.indexOf('.') !== -1 ? arr.indexOf('.') - 1 : arr.length - 1;

  if (length < 3) return num;

  let count = 0;

  for (let i = length; i > 0; i--) {
    count++;

    if (count === 3) {
      arr.splice(i, 0, ',');
      count = 0;
    }
  }

  return arr.join('');
};

export const formatDate = (date, short) => {
  if (date) {
    const split = date.split('-');

    const day = split[2];
    const month = split[1];
    const year = split[0];

    if (short === true) {
      return `${month}/${day}`;
    }

    return `${month}/${day}/${year}`;
  }
};
