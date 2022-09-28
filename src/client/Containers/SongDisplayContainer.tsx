import React, { useEffect, useState } from 'react';
import SongDisplay from '../Components/SongDisplay';

const SongDisplayContainer = (props: any) => {

  // todo: how do we store the current user so we can use it in our fetch request?
  const [ songArray, setSongArray ] = useState([]);

  const exampleData = [
    {
      title: 'Piano Man',
      artist: 'Billy Joel',
      genre: 'Rock'
    },
    {
      title: 'Mr. Brightside',
      artist: 'The Killers',
      genre: 'Punk Rock'
    },
    {
      title: 'Roses',
      artist: 'OutKast',
      genre: 'Hip Hop/Rap'
    }
  ]


  const currentMusician = props.currentMusician;
  console.log('current Musician from SongDisplayContainer props: ', currentMusician);

  // fetch songs from db for current user 
  const getAllSongs = async () => {
    // const songs = await fetch(`/api/musician/songs/${currentMusician}`)
    // then take songs and add to songArray
    // iterate over song array returned
    exampleData.forEach((song, idx) => {
      // create SongDisplay element
      const {title, artist, genre } = song;
      // push to songArray using setSongArray
      const newComponent = <SongDisplay title={title} artist={artist} genre={genre} key={idx}/>
        setSongArray(songArray => [...songArray, newComponent]);
    })

    console.log('songArray at end of getAllSongs', songArray);
  }

  useEffect(() => {
    getAllSongs();
  }, [])


  return (
    <div>
      <div>
        <h1 className='text-4xl px-4 py-2 flex flex-row justify-center'>See {currentMusician}'s songs below!</h1>
      </div>
      <div className='px-4 py-2 flex flex-row justify-center'>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Title</th>
              <th className='border px-4 py-2'>Artist</th>
              <th className='border px-4 py-2'>Genre</th>
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