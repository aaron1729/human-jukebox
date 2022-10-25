import React from 'react';
import AddSong from '../Components/AddSong';
import MusicianInfo from '../Components/MusicianInfo';

function PrivateMusicianContainer(){
  return(
    <div className="private-musician">
      [this is the top of the Private Musician Container -- to be moved to Private Musician Page]

      <MusicianInfo />
      <AddSong />
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
      [...and this is the bottom of the Private Musician Container]
    </div>
  )
}

export default PrivateMusicianContainer;