import React from 'react';
import AddSong from '../Components/AddSong';

function PrivateMusicianContainer(){
  return(
    <div className="private-musician">
      <AddSong/>
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
    </div>
  ) 
}

export default PrivateMusicianContainer;