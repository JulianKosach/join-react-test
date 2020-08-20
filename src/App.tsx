import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// components
import Header from 'components/Header';

// screens
import HomeScreen from 'screens/HomeScreen';
import ApplicantScreen from 'screens/ApplicantScreen';
import CandidatesScreen from 'screens/CandidatesScreen';

// styles
import { useAppStyles } from 'styles/AppStyles';

function App() {
  const S = useAppStyles();
  return (
    <BrowserRouter>
        <Header />
        <div className={S.Container}>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/applicant" exact component={ApplicantScreen} />
            <Route path="/candidates" exact component={CandidatesScreen} />
            <Redirect path="*" to="/" />
          </Switch>
        </div> 
    </BrowserRouter>
  );
}

export default App;
