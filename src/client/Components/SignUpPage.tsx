import React, { useState } from 'react'

const SignUpPage = () => {

  // use react hooks to create state for username and password
  const [data, setData] = useState({
    username:'',
    displayName: '',
    venmoLink: '',
    musicianBio: ''
  })

  const { username, venmoLink, displayName, musicianBio } = data;

  const changeHandler = (e: any) => {
    setData({...data, [e.target.name]: [e.target.value]})
    // console.log('data is:', data);
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // console.log('venmoLInk is:', venmoLink);
    // console.log('musicianBio is:', musicianBio);

    const target = e.target as typeof e.target & {
      username: { value: string };
    };
    const username = target.username.value;
    // console.log(username, password)

    console.log('body will be', JSON.stringify({ username, venmoLink, musicianBio}))

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, venmoLink, musicianBio})
    }
    
    // make post request to backend using username and password
    // const response = await fetch('/api/signup', options)

    // depending on the success/failure of the response, we will useNavigate to redirect to private or public page
  }

  return (

    <div className="flex flex-col items-center ">
      <form onSubmit={handleSubmit} className="bg-slate-200 font-semibold text-fuchsia-700 px-2 rounded-lg">
        Username: <input type="text" name="username" placeholder='Enter username...' value={username} onChange={changeHandler} className="select-none rounded-lg"/>
        <br />
        Musician Display Name: <input type="text" name="displayName" placeholder='Enter stage name...' value={displayName} onChange={changeHandler} className="select-none rounded-lg"/>
        <br />
        Venmo Link: <input type="text" name="venmoLink" placeholder='Enter Venmo link...' onChange={changeHandler} className="select-none rounded-lg"/> 
        <br />
        <label htmlFor="text">Enter Bio:</label>
          <br/>
        <textarea id="text" name="musicianBio" rows={12} cols={50} placeholder="Describe yourself here..." onChange={changeHandler} className="select-none rounded-lg"></textarea>
        <br />
        <div className='flex justify-center'>
          <input type="submit" name="submit" value="Sign Up" className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'/>
        </div>
      </form>
    </div>
  )

}

export default SignUpPage;