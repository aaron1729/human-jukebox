import React from 'react'

const SongDisplay = (props: any) => {

  return (
    // <div>
    //   <span className='songName'>{props.title} | </span>
    //   <span className='artistName'>{props.artist} | </span>
    //   <span className='songGenre'>{props.genre} </span>
    // </div>

      <tr>
        <td className='border px-4 py-2'>{props.title}</td>
        <td className='border px-4 py-2'>{props.artist}</td>
        <td className='border px-4 py-2'>{props.genre}</td>
      </tr>
  )
}

export default SongDisplay;