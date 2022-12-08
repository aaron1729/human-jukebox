import React from 'react'
import { Link } from 'react-router-dom';

const NoMusicianPage = (props: any) => {
  const handle = props.handle
  return (
    <div className="private-musician flex flex-col items-center">
      <Link to="/">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Home
        </button>
      </Link>
      Sorry, no musician with handle {handle} exists in the database!
    </div>
  )
}

export default NoMusicianPage;