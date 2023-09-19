import './styles/main.css'
import Component from './component';
import { useEffect, useState } from 'react';
import { findAllByTestId } from '@testing-library/react';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cant be empty')
  const [passwordError, setPasswordError] = useState('Password cant be empty')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }

  }, [emailError, passwordError])
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  const emailHandler = e => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Incorrect email')
      if (!e.target.value) {
        setEmailError('Email cant be empty')
      }
    } else {
      setEmailError('')
    }
  }


  const passwordHandler = e => {
    setPassword(e.target.value)
    if (e.target.value.length < 3) {
      setPasswordError('Password must be more than 3s')
      if (!e.target.value) {
        setPasswordError('Password cant be empty')
      }
    } else {
      setPasswordError('')
    }
  }


  return (

    <div className="container">

      <div className='form'><h1>Войти в аккаунт</h1>
        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type="text" />
        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}

        <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type="password" />
        <button disabled={!formValid} >Sign in</button>
      </div>

    </div>
  );
}

export default App;
