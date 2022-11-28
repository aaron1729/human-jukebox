import React from 'react';
import AddSong from '../Components/AddSong';
import MusicianInfo from '../Components/MusicianInfo';
import PublicMusicianContainer from './PublicMusicianContainer';

function PrivateMusicianContainer(){
  return(
    <div className="private-musician">
      this is the top of the Private Musician Container. here will be input fields so that the musician can edit their name, handle, venmo link, bio, etc.

      {/* <MusicianInfo /> */}
      {/* <AddSong /> */}
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
      <PublicMusicianContainer />
    </div>
  )
}

export default PrivateMusicianContainer;
