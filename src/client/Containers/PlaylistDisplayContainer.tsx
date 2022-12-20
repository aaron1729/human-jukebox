import React, { useEffect, useState } from 'react';
import PlaylistDisplay from '../Components/PlaylistDisplay';

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

  // see description of useEffect in SongDisplayContainer. however, in this case we might actually *want* to update the list of playlists, in case the user has more than the limiting number dictated by the Spotify API call.
  useEffect(
    () => {getAllPlaylists()},
    []
  )

  return (
    <div className='flex flex-col'>
      <div>
        <h4 className='flex flex-row justify-center'><b>Click a playlist title to see it on Spotify!</b></h4>
      </div>
      {playlistArray}
      
    </div>
  )
}

export default PlaylistDisplayContainer;