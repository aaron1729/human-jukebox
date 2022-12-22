import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import PlaylistDisplay from '../Components/PlaylistDisplay';
import { styles } from '../styles'

const PlaylistDisplayContainer = (props: any) => {

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




    // here, try creating the elements/components in this file instead of a separate one (which requires passing state as props).
    const playlistObjectToInputElement = (playlistObj: Playlist) => {
      const {playlistName, playlistSpotifyId, playlistSpotifyUrl}: {playlistName: string, playlistSpotifyId: string, playlistSpotifyUrl: string} = playlistObj;
      const name: string = playlistName;
      const spotifyUrl: string = playlistSpotifyUrl;
      const spotifyId: string = playlistSpotifyId;
      console.log('in playlistObjectToInputElement, the props are:', name, spotifyUrl, spotifyId)
      return (
        <div key={spotifyId}>
          <input
            type="radio"
            id={spotifyId}
            checked={playlistChoice === spotifyId}
            value={spotifyId}
            onChange={handleRadioChange}
            name="playlist"
          />
          <label htmlFor={spotifyId}>
            <a href={spotifyUrl} target="_blank">{name}</a>
          </label>
        </div>
      )
    }

    setPlaylistArray(playlists.map((playlistObj: Playlist) => playlistObjectToInputElement(playlistObj)));



    // setPlaylistArray(playlists.map((playlistObj: Playlist) => playlistObjectToComponent(playlistObj)));
  }

  // see the description of useEffect in SongDisplayContainer. however, in this case we might actually *want* to update the list of playlists, in case the user has more than the limiting number dictated by the Spotify API call.
  useEffect(
    () => {getAllPlaylists()},
    []
  )




  //////////////////////////////////////////////////////////////////////////////////////////

  // record choice of playlist
  const [playlistChoice, setPlaylistChoice] = useState(null)





  ////// NOTE TO SELF: it seems that these invocations of setPlaylistChoice are not working! for some reason, the state value playlistChoice keeps getting set back to what it's initialized to down below (currently "value3").

  ///// and weirder, it seems like the console.log in handleRadioChange2 is actually *lagging* by one behind the actual clicks.

  const handleRadioChange = async (e: React.SyntheticEvent) => {
    // make target into a union type.
    const target = e.target as typeof e.target & {
      value: string
    };
    console.log('inside of handleRadioChange function, target.value is', target.value)
    // console.log('and with value:', target.value)
    const value = target.value;
    console.log('value is:', value)
    console.log('first, playlistChoice is:', playlistChoice)
    setPlaylistChoice(value)
    console.log('and now, playlistChoice is:', playlistChoice)
    setTimeout(logPlaylistChoice, 1000)
  }

  const logPlaylistChoice = () => {
    console.log('in logPlaylistChoice, and playlistChoice is:', playlistChoice)
  }




  const handleRadioChange2 = (id: string) => {
    setPlaylistChoice(id)
    console.log('handleRadioChange2 triggered, with argument', id)
    console.log('and now playlistChoice is', playlistChoice)
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
          <form>
            {/* {playlistArray} */}





            <input
              type="radio"
              id="playlist1"
              checked={playlistChoice === "value1"}
              value="value1"
              onChange={handleRadioChange}
              name="test-group"
            />
            <label htmlFor="playlist1">
              test label 1
            </label>

            <br />

            <input
              type="radio"
              id="playlist2"
              checked={playlistChoice === "value2"}
              value="value2"
              onChange={handleRadioChange}
              name="test-group"
            />
            <label htmlFor="playlist2">
              test label 2
            </label>

            <br />

            <input
              type="radio"
              id="playlist3"
              checked={playlistChoice === "value3"}
              value="value3"
              onChange={handleRadioChange}
              name="test-group-2"
            />
            <label htmlFor="playlist3">
              test label 3
            </label>

            <br />

            <input
              type="radio"
              id="playlist4"
              checked={playlistChoice === "value4"}
              value="value4"
              onChange={handleRadioChange}
              name="test-group-2"
            />
            <label htmlFor="playlist3">
              test label 4
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