import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'
import { create } from 'ts-node';

function SearchInput(){

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      handle: { value: string };
    };

    const handle = target.handle.value;
    console.log('the handle (inside of the SearchInput component) is:', handle)
    // navigate to public musician profile
    navigate(`/musician/public?musician=${handle}`)
    // navigate({
    //   pathname: '/musician/public',
    //   search: createSearchParams({
    //     musician: handle
    //   }).toString()
    // })
  }


  return(
    <div className="search-div">
      <form onSubmit={handleSubmit} className='my-4 rounded font-semibold'>
        <label htmlFor="handle">find musician by handle: </label>
        <input type="search" name="handle" required className='border border-blue-700 rounded px-1 mr-2'></input>
        <input type="submit" name="search-param" value="Search"
        className='border-2 border-black rounded font-bold text-fuchsia-700 mx-100 my-50 px-2 rounded-full'
        // className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'
        // className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 mt-5 mb-10 rounded-full"
        ></input>
      </form>
    </div>
  )
}

export default SearchInput;