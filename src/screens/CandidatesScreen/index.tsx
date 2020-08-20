import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Candidate from 'components/Candidate';
import Preloader from 'components/Preloader';

import stores from 'stores';

import { useAppStyles } from 'styles/AppStyles';
import { useStyles } from './styles';

const CandidatesScreen = () => {
  const { candidatesStore } = stores;
  const { loading, candidates, submitedCount } = candidatesStore;
  const AppS = useAppStyles();
  const S = useStyles();

  useEffect(() => {
    candidatesStore.fetchAllCandidates();
  }, [candidatesStore]);

  return (
    <div className={AppS.Screen}>
      <p>
        {submitedCount} application{submitedCount === 1 ? '' : 's'} submitted
      </p>

      <div className={S.CandidatesList}>
        {candidates.length ?
          candidates.map(candidate => (
            <Candidate key={candidate.id} candidate={candidate} />
          ))
        :
        <p>Nothing to show</p>}
      </div>

      {loading && <Preloader />}
    </div>
  );
};

export default observer(CandidatesScreen);