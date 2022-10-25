import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'
import { create } from 'ts-node';

function SearchInput(){

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      artistName: { value: string };
    };

    const artistName = target.artistName.value;
    console.log('the artistName (inside of the SearchInput component) is:', artistName)
    // navigate to public musician profile
    // navigate(`/musician/public/${artistName}`)
    navigate({
      pathname: '/musician/public',
      search: createSearchParams({
        artist: artistName
      }).toString()
    })
  }


  return(
    <div className="search-div">
      <form onSubmit={handleSubmit} className='my-4 rounded font-semibold'>
        <label htmlFor="artistName">Look Up a Musician: </label>
        <input type="search" name="artistName" required className='border border-blue-700 rounded px-1 mr-2'></input>
        <input type="submit" name="search-param" value="Search" className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'></input>
      </form>
    </div>
  )
}

export default SearchInput;