import { style } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import PlaylistDisplay from '../Components/PlaylistDisplay';
import { styles } from '../styles'

const PlaylistDisplayContainer = (props: any) => {


  ////////////////////////////////////////
  // the following relates to the playlistArray

  ////////////////////////////////////////

  // playlistArray is an array of PlaylistDisplay *components*
  const [ playlistArray, setPlaylistArray ] = useState([]);

  // fetch musician's playlists from Spotify API and update PlaylistDisplayContainer therefrom
  const getAllPlaylists = async () => {
    const response = await fetch('/api/getAllPlaylists');
    const playlists = await response.json();
    console.log('playlists from getAllPlaylists:', playlists);

    type Playlist = {
      playlistName: string,
      playlistSpotifyId: string,
      playlistSpotifyUrl: string
    }

    const playlistObjectToComponent = (playlistObj: Playlist) => {
      const {playlistName, playlistSpotifyId, playlistSpotifyUrl}: {playlistName: string, playlistSpotifyId: string, playlistSpotifyUrl: string} = playlistObj;
      const name: string = playlistName;
      const spotifyUrl: string = playlistSpotifyUrl;
      const spotifyId: string = playlistSpotifyId;
      // console.log('inside of playlistObjectToComponent function, spotifyId is:', spotifyId, name, spotifyUrl)
      const newPlaylistDisplay = <PlaylistDisplay
        name={name}
        spotifyUrl={spotifyUrl}
        key={spotifyId}
        id={spotifyId}
        playlistChoice={playlistChoice}
        handleRadioChange={handleRadioChange}
        handleRadioChange2={handleRadioChange2}
      />;
      return newPlaylistDisplay;
    }

    setPlaylistArray(playlists.map((playlistObj: Playlist) => playlistObjectToComponent(playlistObj)));
  }

  // see the description of useEffect in SongDisplayContainer. however, in this case we might actually *want* to update the list of playlists, in case the user has more than the limiting number dictated by the Spotify API call.
  useEffect(
    () => {getAllPlaylists()},
    []
  );




  //////////////////////////////////////////////////////////////////////////////////////////

  // record choice of playlist
  // TO DO: this should default to the current value, once that's saved in the database
  const [playlistChoice, setPlaylistChoice] = useState(null)

  const handleRadioChange = (e: React.SyntheticEvent) => {
    // make target into a union type.
    const target = e.target as typeof e.target & {
      value: string
    };
    console.log('inside of handleRadioChange function, and target.value is', target.value)
    // note that setPlaylistChoice happens asynchronously, so it won't show up in a simple console.log (or even one with a setTimeout).
    setPlaylistChoice(target.value)
  }



  const handleRadioChange2 = (id: string) => {
    setPlaylistChoice(id)
    console.log('handleRadioChange2 triggered, with argument', id)
    console.log('and now playlistChoice is', playlistChoice)
  }


  const logPlaylistChoice = () => {
    console.log('playlistChoice is:', playlistChoice)
  }




  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleSubmit function triggered, and playlistChoice is:', playlistChoice)
    props.setPlaylist(playlistChoice)
    props.setShowPlaylistModal(false)
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleCancel function triggered')
    props.setShowPlaylistModal(false)
  }


// it seems that a "name" field for these input elements is only needed when using HTML (not React) to group these radio buttons together. here, setting the "checked" field to equal an evaluated boolean already does the job.
// it's unclear if the "id" field is needed, but it's probably a good idea. likewise with keys.
  return (
    <div className='flex flex-col justify-center'>
      <h4><b>Click a playlist title to see it on Spotify!</b></h4>

      <button onClick={logPlaylistChoice} className={styles.buttonSmall}>
              log playlistChoice to the console
      </button>


        <form>

          {playlistArray}

          <button onClick={handleSubmit} className={styles.buttonSmall}>
            submit
          </button>
          <button onClick={handleCancel} className={styles.buttonSmall}>
            cancel
          </button>


{/* 
            <label htmlFor="playlist1">
            <input
              type="radio"
              id="playlist1"
              key="playlist1"
              checked={playlistChoice === "value1"}
              value="value1"
              onChange={handleRadioChange}
              // name="test-group"
            />
              test label 1
            </label>

            <br />

            <label htmlFor="4lAjVOyWSUZmtS6dK0tGab">
              <input
                type="radio"
                id="4lAjVOyWSUZmtS6dK0tGab"
                key="4lAjVOyWSUZmtS6dK0tGab"
                checked={playlistChoice === "4lAjVOyWSUZmtS6dK0tGab"}
                value="4lAjVOyWSUZmtS6dK0tGab"
                onChange={handleRadioChange}
              />
              hard-coded: Where My Girls At
            </label>

            <br />

            <label htmlFor="playlist2">
            <input
              type="radio"
              id="playlist2"
              key="playlist2"
              checked={playlistChoice === "value2"}
              value="value2"
              onChange={handleRadioChange}
              // name="test-group"
            />
              test label 2
            </label>

            <br />

            <label htmlFor="playlist3">
            <input
              type="radio"
              id="playlist3"
              key="playlist3"
              checked={playlistChoice === "value3"}
              value="value3"
              onChange={handleRadioChange}
              // name="test-group"
            />
              test label 3
            </label>

            <br />

            <label htmlFor="playlist3">
            <input
              type="radio"
              id="playlist4"
              key="playlist4"
              checked={playlistChoice === "value4"}
              value="value4"
              onChange={handleRadioChange}
              // name="test-group"
            />
              test label 4
            </label>


            <br />

            */}



        </form>
    </div>
  )
}

export default PlaylistDisplayContainer;