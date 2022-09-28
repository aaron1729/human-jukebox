import React from 'react';

function SearchInput(){
  return(
    <div className="search-div">
      <form action="" method="get" className='my-4 rounded'>
        <label htmlFor="search-param">Look Up a Musician: </label>
        <input type="search" name="search-param" required className='border border-blue-700 rounded'></input>
        <input type="submit" name="search-param" value="Search" className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'></input>
      </form>
    </div>
  )
}

export default SearchInput;