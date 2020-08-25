
import Candidate from 'types/Candidate';

type MultiplierOption = {
  field: keyof Candidate;
  miltiplier: number; 
};

export const candidateScoreMultiplier: MultiplierOption[] = [
  { field: 'fullName', miltiplier: 1 },
  { field: 'email', miltiplier: 1 },
  { field: 'password', miltiplier: 1 },
  { field: 'phone', miltiplier: 2 },
  { field: 'avatar', miltiplier: 5 }
];

export const getCandidateScorePercentage = (candidate: Candidate) => {
  if (!candidate) return 0;
  const score = {
    total: 0,
    passed: 0
  };
  candidateScoreMultiplier.forEach((item: MultiplierOption) => {
    const { field, miltiplier } = item;
    score.total = score.total + miltiplier;
    if (!!candidate[field]) score.passed = (score.passed + miltiplier);
  });
  const { total, passed } = score;
  return Math.round((passed / total) * 100);
};

export const getCandidateScore = (candidate: Candidate) => {
  const scorePercentage = getCandidateScorePercentage(candidate);
  const score = {
    scorePercentage,
    scoreColor: 'error',
    scoreTitle: 'Incomplete'
  };
  if (scorePercentage >= 90) {
    score.scoreColor = 'ok';
    score.scoreTitle = 'Perfect';
    return score;
  }
  if (scorePercentage >= 70) {
    score.scoreColor = 'ok';
    score.scoreTitle = 'Good';
    return score;
  }
  if (scorePercentage >= 40) {
    score.scoreColor = 'warn';
    score.scoreTitle = 'Okay';
  }
  return score;
};
