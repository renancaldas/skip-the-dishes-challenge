
const truncate2Decimals = (number) => {
  return number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}

module.exports = {
  truncate2Decimals
}