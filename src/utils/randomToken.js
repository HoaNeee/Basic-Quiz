const randomNumber = (min, max) => {
  let num = min + Math.floor(Math.random() * (max - min));
  return num;
};

const ramdomToken = () => {
  let charLower = "",
    charUpper = "",
    charNum = "";
  for (let i = 65; i <= 90; i++) {
    charUpper += String.fromCharCode(i);
    charLower += String.fromCharCode(i + 32);
  }
  for (let i = 48; i <= 57; i++) {
    charNum += String.fromCharCode(i);
  }

  let out = "";
  let arr = [charLower, charUpper];
  for (let i = 0; i < 24; i++) {
    const percent = randomNumber(0, 10);
    if (percent > 7) {
      const idxNum = randomNumber(0, 10);
      out += charNum[idxNum];
    } else {
      const idxArr2 = randomNumber(0, 2);
      const idxChar = randomNumber(0, 26);
      out += arr[idxArr2][idxChar];
    }
  }

  return out;
};

export default ramdomToken;
