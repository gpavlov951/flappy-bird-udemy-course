export const getBestScore = () => localStorage.getItem("bestScore") || 0;
export const setBestScore = (bestScore) =>
  localStorage.setItem("bestScore", bestScore);
