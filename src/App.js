import './styles/main.css'
import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLengthError':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLocaleLowerCase()) ? setEmailError(false) : setEmailError(true)

      }
    }
  }, [value])
  return {
    isEmpty,
    minLengthError,
    emailError
  }
}


const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setIsDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = (e) => {
    setIsDirty(true)
  }
  return {
    value,
    onBlur,
    onChange,
    isDirty,
    ...valid
  }
}


function App() {
  const [formValid, setFormValid] = useState(false)
  const email = useInput('', { isEmpty: true, minLengthError: 5, isEmail: true });
  const password = useInput('', { isEmpty: true, minLengthError: 3 })
  const emptyLog = (email.isDirty && email.isEmpty) && <div className='error'>Email is Empty</div>
  const minLength = (email.isDirty && email.minLengthError) && <div className='error'>Email is low</div>
  const incorEmail = (email.isDirty && email.emailError) && <div className='error'>incorrect email</div>
  const emptyPass = (password.isDirty && password.isEmpty) && <div className='error-pass'>Password is Empty</div>
  const lowPass = (password.isDirty && password.minLengthError) && <div className='error-pass'>Password is low</div>

  useEffect(() => {
    if (incorEmail || lowPass) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [incorEmail, lowPass])
  return (

    <div className="container">
      <div className='form'><h1>Account</h1>
        <img src={require('./images/tree.png')} alt="" />
        {(email.isDirty && email.isEmpty) && <div className='error'>Email is Empty</div>}
        {!emptyLog ? minLength : <div className='error'></div>}
        {!minLength ? incorEmail : <div className='error'></div>}

        <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name='email' type="text" />
        {(password.isDirty && password.isEmpty) && <div className='error-pass'>Password is Empty</div>}
        {!emptyPass ? lowPass : <div className='error-pass'></div>}
        <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name='password' type="password" />
        <button disabled={!formValid}>Sign in</button>
      </div>

    </div>
  );
}

export default App;
