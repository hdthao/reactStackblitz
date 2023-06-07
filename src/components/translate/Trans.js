import React from 'react';
import axios from 'axios';
import { useState } from 'react';
function Translate() {
  const [text, setText] = useState('');
  const [rs, setRs] = useState('');
  const [country, setCountry] = useState('es');
  const listCountry = ['es', 'ja', 'ko', 'it'];
  const encodedParams = new URLSearchParams();
  encodedParams.set('source', 'en');
  encodedParams.set('target', country);
  encodedParams.set('q', text);
  const config = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '76f140e078mshfe0e04452eefcc2p11d8d7jsn1a9d599c2765',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    data: encodedParams,
  };
  const callAPI = async () => {
    const res = await axios.request(config);
    setRs(res.data.data.translations[0].translatedText);
  };
  const handleTranslate = () => {
    callAPI();
  };
  const handleOnchange = (event) => {
    setCountry(event.target.value);
  };
  return (
    <div>
      <select onChange={handleOnchange}>
        {listCountry.map((elm) => {
          return (
            <option key={elm} value={elm}>
              {elm}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleTranslate}>Translate</button>
      <br />
      <h1>Value translate: {rs}</h1>
    </div>
  );
}
export default Translate;
