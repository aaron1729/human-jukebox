import React, { useEffect, useState } from 'react';
import SongDisplay from '../Components/SongDisplay';

const SongDisplayContainer = (props: any) => {

  // this is an array of song *components*
  const [ songArray, setSongArray ] = useState([]);

  const handle = props.handle;
  console.log('current Musician from SongDisplayContainer props: ', handle);

  // fetch songs from db for current user 
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
      const spotifySongId = spotify_id;
      return <SongDisplay name={name} artist={artist} key={spotifySongId} previewUrl={previewUrl} />
    }

    setSongArray(songs.map((songObj: Song) => songObjectToComponent(songObj)));







    // // then take songs and add to songArray
    // // iterate over song array returned
    // songs.forEach((song: any, index: number) => {
    //   // create a new SongDisplay component and push it to songArray using setSongArray
    //   const {name, artist, preview_url, spotify_id} = song;
    //   const previewUrl = preview_url
    //   const spotifySongId = spotify_id
    //   const newSongDisplayComponent = <SongDisplay name={name} artist={artist} key={spotifySongId} previewUrl={previewUrl} />
    //     setSongArray(songArray => [...songArray, newSongDisplayComponent]);
    //     // setSongArray([...songArray, newSongDisplayComponent]);
    //     console.log('and now songArray is:', songArray);
    // })
    // console.log('at end of getAllSongs, songArray is:' + JSON.stringify(songArray));
  }

  useEffect(() => {
    getAllSongs();
  }, [])

  return (
    <div>
      <div>
        <h4 className='flex flex-row justify-center'> Click a title to hear a preview!</h4>
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