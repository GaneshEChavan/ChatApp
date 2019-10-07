function tossPercentage(totalToss) {
  try {
    if (typeof totalToss !== "number") throw false;
    if (totalToss < 1) throw "failed";
    let count = 0;
    let cHead = () => (Math.random() < 0.5 ? "Heads" : "Tails");
    for (let i = 0; i <= totalToss; i++) {
      cHead() === "Heads" ? count++ : "move on";
    }
    return (count / totalToss) * 100;
  } catch (err) {
    return err;
  }
}
module.exports = tossPercentage;
