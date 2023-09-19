import './styles/main.css'
import { useEffect, useState } from 'react';
function App() {

  return (

    <div className="container">

      <div className='form'><h1>Войти в аккаунт</h1>

        <input name='email' type="text" />

        <input name='password' type="password" />
        <button  >Sign in</button>
      </div>

    </div>
  );
}

export default App;
