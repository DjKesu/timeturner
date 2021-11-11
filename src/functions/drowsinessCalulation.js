export { getDrowsiness }

// return value range: 1-10
function getDrowsiness(ear) {
  return (10 - (ear-0.1)*25);
}