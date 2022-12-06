import React, { useEffect, useState } from 'react';
import SongDisplay from '../Components/SongDisplay';

const SongDisplayContainer = (props: any) => {

  // todo: how do we store the current user so we can use it in our fetch request?
  const [ songArray, setSongArray ] = useState([]);


  const handle = props.handle;
  console.log('current Musician from SongDisplayContainer props: ', handle);

  // fetch songs from db for current user 
  const getAllSongs = async () => {
    const response = await fetch(`/api/songs/${handle}`);
    const songs = await response.json();
    console.log('songs from getAllSongs:', songs);
    // then take songs and add to songArray
    // iterate over song array returned
    songs.forEach((song: any, idx: number) => {
      // create a new SongDisplay component and push it to songArray using setSongArray
      const {name, artist, preview_url} = song;
      const previewUrl = preview_url
      const newComponent = <SongDisplay name={name} artist={artist} key={idx} previewUrl={previewUrl} />
        setSongArray(songArray => [...songArray, newComponent]);
        console.log('and now songArray is:', songArray);
    })
    console.log('at end of getAllSongs, songArray is:' + JSON.stringify(songArray));
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