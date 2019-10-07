let windchill = (temp, speed) => {
  try {
    if (typeof temp !== "number" || typeof speed !== "number") throw false;
    if (temp >= 50 || speed > 120 || speed < 3)
      throw "not in range of calculation";

    return (
      35.74 + 0.6215 * temp + (0.4275 * temp - 35.75) * Math.pow(speed, 0.16)
    );
  } catch (err) {
    return err;
  }
};
module.exports = windchill;
