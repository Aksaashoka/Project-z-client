import React, { useEffect, useState, useContext } from 'react';
import { Requetesocket } from '../../realtime';
import { AuthContext } from '../../context/AuthContext';

export const HomeScreen = () => {
  const { auth } = useContext( AuthContext );

  useEffect(() => {
    Requetesocket.on('mensaBack', (data) => console.log(data));
  }, []);

  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    Requetesocket.emit('Mensajete', inputValue);
  };
  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <h1>Hola {auth.name} {auth.last_name}</h1>
      <br />
      socketin
      <form onSubmit={handleSubmit}>
        <input type='text' value={inputValue} onChange={onChange} />
        <button>Send</button>
      </form>
    </div>
  );
};


