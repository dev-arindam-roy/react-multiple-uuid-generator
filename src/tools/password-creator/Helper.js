// Secure random index generator
export const getRandomIndex = (str) => {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % str.length;
};

// Fisher-Yates Shuffle Algorithm
export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Strong password generator
export const generateStrongPassword = (length) => {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const allChars = upperCase + lowerCase + numbers + symbols;

  if (length < 8) return ""; // Ensure valid length

  let password = [
    upperCase[getRandomIndex(upperCase)],
    lowerCase[getRandomIndex(lowerCase)],
    numbers[getRandomIndex(numbers)],
    symbols[getRandomIndex(symbols)],
  ];

  // Fill remaining characters randomly
  for (let i = 4; i < length; i++) {
    password.push(allChars[getRandomIndex(allChars)]);
  }

  // Shuffle the password using Fisher-Yates algorithm
  return shuffleArray(password).join("");
};
