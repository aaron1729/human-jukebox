import React from 'react'

const SongDisplay = (props: any) => {

  return (
      <tr>
        <td className='border px-4 py-2'><a href={props.previewUrl} target='_blank'>{props.name}</a></td>
        <td className='border px-4 py-2'>{props.artist}</td>
      </tr>
  )
}

export default SongDisplay;