import React, { useEffect, useState } from 'react';
import { Requetesocket } from '../realtime';
export const Socketin = () => {
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
      socketin
      <form onSubmit={handleSubmit}>
        <input type='text' value={inputValue} onChange={onChange} />
        <button>Send</button>
      </form>
    </div>
  );
};
