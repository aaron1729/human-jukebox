import React, { useEffect, useState } from 'react';
import PlaylistDisplay from '../Components/PlaylistDisplay';
import { styles } from '../styles'

const PlaylistsDisplayContainer = (props: any) => {

  const setShowPlaylistsModal = props.setShowPlaylistsModal;
  const updatePrivateMusicianInfo = props.updatePrivateMusicianInfo;
  // spotifyPlaylistId starts life as a property on the privateMusicianInfo state object in the PrivateMusicianContainer component (which calls this component). that gets updated:
    // inside of getPrivateMusicianInfo (from database), which gets called immediately with a useEffect;
    // inside of updatePrivateMusicianInfo, upon a successful PUT request to the database.
  const spotifyPlaylistId = props.spotifyPlaylistId;

  // playlistArray is an array of PlaylistDisplay *components*
  const [ playlistArray, setPlaylistArray ] = useState([]);

  // fetch musician's playlists from Spotify API and update playlistArray therefrom
  const getAllPlaylists = async () => {
    const response = await fetch('/api/getAllPlaylists');
    const playlists = await response.json();
    console.log('playlists from getAllPlaylists:', playlists);

    const playlistObjectToComponent = (playlistObj: PlaylistObj) => {
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
      />;
      return newPlaylistDisplay;
    }

    setPlaylistArray(playlists.map((playlistObj: PlaylistObj) => playlistObjectToComponent(playlistObj)));
  }

  // see the description of useEffect in SongDisplayContainer. note that here we might want to update the list of playlists, in case the user has more than the limiting number dictated by the Spotify API call.
  useEffect(
    () => {getAllPlaylists()},
    []
  );




  //////////////////////////////////////////////////////////////////////////////////////////

  // record choice of playlist
  // TO DO: this should default to the current value, if there's one that's already saved in the database.
    // we could do useState(spotifyPlaylistId).
  // TO DO: allow to load more playlists, since spotify API limits the number that are returned.
  const [playlistChoice, setPlaylistChoice] = useState(spotifyPlaylistId)

  const handleRadioChange = (e: React.SyntheticEvent) => {
    // make target into a union type.
    const target = e.target as typeof e.target & {
      value: string
    };
    console.log('inside of handleRadioChange function, and target.value is', target.value);
    // note that setPlaylistChoice happens asynchronously, so it won't show up in a simple console.log (or even one with a setTimeout). this can be gotten around by having a temporary button that triggers a temporary "log playlistChoice to the console" function.
    setPlaylistChoice(target.value);
  }





  

  const logPlaylistChoice = () => {
    console.log('playlistChoice is:', playlistChoice)
  }




  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleSubmit function triggered, and playlistChoice is:', playlistChoice)

    let spotify_playlist_name, spotify_playlist_id, spotify_playlist_url;
    playlistArray.forEach((playlistComponent) => {
      if (playlistComponent.props.id === playlistChoice) {
        spotify_playlist_name = playlistComponent.props.name;
        spotify_playlist_id = playlistComponent.props.id;
        spotify_playlist_url = playlistComponent.props.spotifyUrl;
      }
    })

    // this can only occur for a new user who hasn't yet chosen a playlist. (otherwise, playlistChoice is initialized at the previous choice.)
    if (!spotify_playlist_name) {
      console.log('playlistArray is:', playlistArray)
      alert('error: no playlist chosen');
      return;
    }

    const update: UpdateObj = {spotify_playlist_name, spotify_playlist_id, spotify_playlist_url};

    updatePrivateMusicianInfo(update);
    setShowPlaylistsModal(false);
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleCancel function triggered')
    setShowPlaylistsModal(false)
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

        </form>
    </div>
  )
}

export default PlaylistsDisplayContainer;