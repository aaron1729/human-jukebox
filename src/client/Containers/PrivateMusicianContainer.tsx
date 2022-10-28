import React from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import AddSong from '../Components/AddSong';
import MusicianInfo from '../Components/MusicianInfo';

function PrivateMusicianContainer(){
  return(
    <div className="private-musician">
      [this is the top of the Private Musician Container (which is to be moved to Private Musician Page). the idea is for it to contain some controls up above (e.g. add/change venmo handle etc.), and then below it should render a live-updating version of the musician's public page.]

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