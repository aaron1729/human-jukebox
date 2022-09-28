import React from 'react'

const SongDisplay = (props: any) => {

  return (
    <div>
      <span className='songName'>{props.songName} | </span>
      <span className='artistName'>{props.artistName} | </span>
      <span className='songGenre'>{props.genre} </span>
    </div>
  )
}

export default SongDisplay;