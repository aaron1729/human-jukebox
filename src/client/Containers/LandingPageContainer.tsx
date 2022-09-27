import React from 'react';
import SearchInput from '../Components/SearchInput';
import LoginForm from '../Components/LoginForm';
import SignUpPage from '../Components/SignUpPage';

function LandingPageContainer(){
  return(
    <div className="landing-page">
      <LoginForm />
      <hr/>
      <SignUpPage />
      <hr/>
      <SearchInput/>
    </div>
  )
}

export default LandingPageContainer;