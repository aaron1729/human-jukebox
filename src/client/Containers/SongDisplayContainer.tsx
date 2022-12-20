import React, { useEffect, useState } from 'react';
import SongDisplay from '../Components/SongDisplay';

const SongDisplayContainer = (props: any) => {

  // songArray is an array of song *components*
  const [ songArray, setSongArray ] = useState([]);

  const handle = props.handle;
  console.log('current musician handle from SongDisplayContainer props:', handle);

  // fetch songs from db for current user and update songArray therefrom
  const getAllSongs = async () => {
    const response = await fetch(`/api/songs/${handle}`);
    const songs = await response.json();
    console.log('songs from getAllSongs:', songs);

    type Song = {
      album_name: string,
      artist: string,
      displayed: boolean,
      familiarity: number | null,
      name: string,
      popularity: number,
      preview_url: string,
      spotify_id: string
    }

    const songObjectToComponent = (songObj: Song) => {
      const {name, artist, preview_url, spotify_id}: {name: string, artist: string, preview_url: string, spotify_id: string} = songObj;
      const previewUrl: string = preview_url
      const songSpotifyId = spotify_id;
      return <SongDisplay name={name} artist={artist} previewUrl={previewUrl} key={songSpotifyId} />
    }

    setSongArray(songs.map((songObj: Song) => songObjectToComponent(songObj)));
  }


  // the first argument is the effect function. the second argument (which is optional) indicates the dependencies of the effect function. upon each rerender (such as *after* running the effect function the first time), React checks the dependencies to determine whether to run the effect function again. if the second argument is omitted, React will execute the effect function upon every rerender. in this case, omitting the second argument causes the database to be queried over and over. so we instead pass an empty array of dependencies, which ensures that the effect function is only run once.
  useEffect(
    () => {getAllSongs()},
    []
  )

  return (
    <div>
      <div>
        <h4 className='flex flex-row justify-center'><b>Click a song title to hear a preview!</b></h4>
      </div>
      <div className='px-4 py-2 flex flex-row justify-center'>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Title</th>
              <th className='border px-4 py-2'>Artist</th>
              {/* <th className='border px-4 py-2'>Tags</th> */}
            </tr>
          </thead>
          <tbody>
            {songArray}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SongDisplayContainer;