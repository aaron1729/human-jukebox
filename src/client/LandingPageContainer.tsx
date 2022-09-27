import React from 'react';
import SearchInput from './SearchInput';

function LandingPageContainer(){
  return(
    <div className="landing-page">
      {
      // this div will contain the serach component and the login/signup component
        <SearchInput/>
      }
    </div>
  )
}

export default LandingPageContainer;