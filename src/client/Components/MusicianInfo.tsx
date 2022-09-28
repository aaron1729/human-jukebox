import React, {useEffect, useState} from 'react'

const MusicianInfo = (props: any) => {

  const [ musicianInfo, setMusicianInfo ] = useState({
    bandName: '',
    venmoLink: '',
    musicianBio: ''
  });

  // make request to get current musician's info
  const getMusicianInfo = () => {
    console.log('running getMusicianInfo')
    // fetch to db to get bandName, venmoLink, and musicianBio based on props.currentMusician
    // setMusicianInfo
    // const dataFromFetch = {};
    setMusicianInfo({...musicianInfo, bandName: 'Aaron', venmoLink: 'givememoney@venmo.com', musicianBio: 'rly good at song'})
  }

  useEffect(() => {
    getMusicianInfo();
  }, [])


  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-4xl py-2'><span className='font-bold'>Musician:</span> {props.currentMusician}</h2>
      <span className='text-2xl'><span className='font-bold'>Venmo Link:</span> {musicianInfo.venmoLink}</span>
      <span className='text-2xl'><span className='font-bold'>Bio:</span> {musicianInfo.musicianBio}</span>
      <hr />
    </div>
  )

}

export default MusicianInfo;