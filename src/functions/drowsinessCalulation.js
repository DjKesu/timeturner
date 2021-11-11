export { getEnergyLevel, getDrowsiness }

// return value range: 1-10
function getEnergyLevel(ear) {
  return (ear-0.1)*25;
}

// return value range: 1-10
function getDrowsiness(ear) {
  return 10 - getEnergyLevel(ear);
}