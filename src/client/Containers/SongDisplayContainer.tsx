import React, { useEffect } from 'react';
import SongDisplay from '../Components/SongDisplay';

const SongDisplayContainer = () => {

  // todo: how do we store the current user so we can use it in our fetch request?

  const exampleMusician = 'Aaron';
  // fetch songs from db for current user 
  const getAllSongs = async () => {
    const songs = await fetch(`/api/musician/songs/${exampleMusician}`)
    // then take songs and add to songArray
  }

  useEffect(() => {
    getAllSongs();
  })


  // add these songs to song array 
  // const songArray = [];

  const exampleSongArray = [
    <SongDisplay songName={'Here Comes the Sun'} artistName={'The Beatles'} genre={'Rock'}/>
  ]

  return (
    <div>
      <h1>See {exampleMusician}'s songs below!</h1>
      {exampleSongArray}
    </div>
  )
}

export default SongDisplayContainer;