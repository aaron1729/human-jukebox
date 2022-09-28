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
  }

  return (

    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        Username: <input type="text" name="username" placeholder='Your Human Jukebox Username' value={username} onChange={changeHandler}/>
        <br />
        Musician Display Name: <input type="text" name="displayName" placeholder='Your Artist Name' value={displayName} onChange={changeHandler}/>
        <br />
        Venmo Link: <input type="text" name="venmoLink" placeholder='Venmo Link' onChange={changeHandler}/> 
        <br />
        <label htmlFor="text">Enter Bio:</label>
          <br/>
        <textarea id="text" name="musicianBio" rows={12} cols={50} placeholder="Describe yourself here..." onChange={changeHandler}></textarea>
        <br />
        <input type="submit" name="submit" value="Sign Up"/>
      </form>
    </div>
  )

}

export default SignUpPage;