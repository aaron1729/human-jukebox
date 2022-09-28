import React from 'react';
import MusicianInfo from '../Components/MusicianInfo';

function PrivateMusicianContainer(){
  return(
    <div className="private-musician">
      <MusicianInfo />
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
    </div>
  ) 
}

export default PrivateMusicianContainer;