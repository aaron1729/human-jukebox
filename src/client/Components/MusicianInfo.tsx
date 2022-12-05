import React, {useEffect, useState} from 'react'

const MusicianInfo = (props: any) => {

  const [ musicianInfo, setMusicianInfo ] = useState({
    displayName: '',
    venmo: '',
    bio: ''
  });

  // make request to get current musician's info
  const getMusicianInfo = () => {
    console.log('running getMusicianInfo function in MusicianInfo component')
    // fetch to db to get displayName, venmo, and bio based on props.handle
    // setMusicianInfo
    // const dataFromFetch = {};
    setMusicianInfo({...musicianInfo, displayName: 'displayName [hard-coded]', venmo: 'venmo [hard-coded]', bio: 'rly good at song -- srsly!! [hard-coded]'})
  }

  useEffect(() => {
    getMusicianInfo();
  }, [])


  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-4xl py-2'><span className='font-bold'>name:</span> {musicianInfo.displayName}</h2>
      <span className='text-2xl'><span className='font-bold'>handle:</span> {props.handle} [passed from props]</span>
      <span className='text-2xl'><span className='font-bold'>Venmo Link:</span> {musicianInfo.venmo}</span>
      <span className='text-2xl'><span className='font-bold'>Bio:</span> {musicianInfo.bio}</span>
      <hr />
    </div>
  )

}

export default MusicianInfo;