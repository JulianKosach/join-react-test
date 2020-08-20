
export const candidateScoreMultiplier = [
  { field: 'fullName', miltiplier: 1 },
  { field: 'email', miltiplier: 1 },
  { field: 'password', miltiplier: 1 },
  { field: 'phone', miltiplier: 2 },
  { field: 'avatar', miltiplier: 5 }
];

export const getCandidateScorePercentage = (candidate: any) => {
  if (!candidate) return 0;
  const total = candidateScoreMultiplier.reduce((sum, { miltiplier }) => (sum + miltiplier), 0);
  const passed = candidateScoreMultiplier.reduce((sum, { field, miltiplier }) => (
    field && candidate[field] ? (sum + miltiplier) : sum
  ), 0);
  return Math.round((passed / total) * 100);
};

export const getCandidateScore = (candidate: any) => {
  const scorePercentage = getCandidateScorePercentage(candidate);
  let scoreColor = 'error';
  let scoreTitle = 'Incomplete';
  if (scorePercentage >= 40) {
    scoreColor = 'warn';
    scoreTitle = 'Okay';
  }
  if (scorePercentage >= 70) {
    scoreColor = 'ok';
    scoreTitle = 'Good';
  }
  if (scorePercentage >= 90) {
    scoreColor = 'ok';
    scoreTitle = 'Perfect';
  }
  return {
    scorePercentage,
    scoreColor,
    scoreTitle
  };
};
