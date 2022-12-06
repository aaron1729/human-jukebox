import React, {useEffect, useState} from 'react'

const MusicianInfo = (props: any) => {

  const handle = props.handle;

  const [musicianInfo, setMusicianInfo] = useState({
    handle,
    displayName: '',
    bio: '',
    venmo: '',
    instagram: '',
  });

  // make request to get current musician's info
  const getMusicianInfo = async () => {
    const response = await fetch(`/api/info_public/${handle}`);
    const info = await response.json();
    console.log('info from getMusicianInfo:', info);
    setMusicianInfo({...musicianInfo, displayName: info.display_name, venmo: info.venmo, bio: info.bio})
  }

  useEffect(() => {
    getMusicianInfo();
  }, [])


  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-4xl py-2'><span className='font-bold'>name:</span> {musicianInfo.displayName}</h2>
      <span className='text-2xl'><span className='font-bold'>handle:</span> {props.handle} [passed from props]</span>
      <span className='text-2xl'><span className='font-bold'>Venmo Link:</span>{musicianInfo.venmo}</span>
      <span className='text-2xl'><span className='font-bold'>Bio:</span> {musicianInfo.bio}</span>
      <hr />
    </div>
  )

}

export default MusicianInfo;