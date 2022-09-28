import React from 'react';
import SongDisplayContainer from './SongDisplayContainer';

function PublicMusicianContainer(){
  return(
    <div className="Public-musician">
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
      <SongDisplayContainer />
    </div>
  ) 
}

export default PublicMusicianContainer;