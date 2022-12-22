import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import PlaylistDisplay from '../Components/PlaylistDisplay';
import { styles } from '../styles'

const PlaylistDisplayContainer = (props: any) => {

  // playlistArray is an array of playlist *components*
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
      const newPlaylistDisplay = <PlaylistDisplay name={name} spotifyUrl={spotifyUrl} key={spotifyId} />;
      return newPlaylistDisplay;
    }

    setPlaylistArray(playlists.map((playlistObj: Playlist) => playlistObjectToComponent(playlistObj)));
  }

  // see the description of useEffect in SongDisplayContainer. however, in this case we might actually *want* to update the list of playlists, in case the user has more than the limiting number dictated by the Spotify API call.
  useEffect(
    () => {getAllPlaylists()},
    []
  )

  //////////////////////////////////////////////////////////////////////////////////////////

  const [playlistChoice, setPlaylistChoice] = useState("value2")

  const handleRadioChange = (e: React.SyntheticEvent) => {
    // make target into a union type.
    const target = e.target as typeof e.target & {
      value: string
    };
    setPlaylistChoice(target.value)
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
// it's unclear if the "id" field is needed, but it's probably a good idea.
  return (
    <div className='flex flex-col justify-center'>
      <h4><b>Click a playlist title to see it on Spotify!</b></h4>
          {/* {playlistArray} */}
          <form onSubmit={handleSubmit}>
            <input
              type="radio"
              // id="playlist1"
              checked={playlistChoice === "value1"}
              value="value1"
              onChange={handleRadioChange}
            />
            <label htmlFor="playlist1">
              test label 1
            </label>
            <br />
            <input
              type="radio"
              // id="playlist2"
              checked={playlistChoice === "value2"}
              value="value2"
              onChange={handleRadioChange}
            />
            <label htmlFor="playlist2">
              test label 2
            </label>
            <br />
            <button onClick={handleSubmit} className={styles.buttonSmall}>
              submit
            </button>
            <button onClick={handleCancel} className={styles.buttonSmall}>
              cancel
            </button>


            {/* <input type="submit" value="submit" className={styles.buttonSmall} /> */}
            <br />
            {/* <input type="submit" value="cancel" className={styles.buttonSmall} /> */}
          </form>
    </div>
  )
}

export default PlaylistDisplayContainer;