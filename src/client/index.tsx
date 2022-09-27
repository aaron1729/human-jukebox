import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './Components/LoginForm'
import SignUpPage from './Components/SignUpPage';

const App = () => {
  return (
    <div>
      <h1>Welcome (in index.tsx)!</h1>
      <LoginForm />
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);