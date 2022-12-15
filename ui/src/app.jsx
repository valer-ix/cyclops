import React, { useEffect, useState, useReducer } from 'react';
import Urbit from '@urbit/http-api';
import { scryCharges } from '@urbit/api';
import { AppTile } from './components/AppTile';
import axios from "axios";
import * as cheerio from "cheerio";

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

export function App() {
  const [showURL, setShowURL] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [text, setText] = useState('')

  useEffect(() => {
    async function init() {
      const charges = (await api.scry(scryCharges)).initial;
    }
    setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco \
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, \
    sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

    const keyEnterHandler = (event) => {
      if (event.key === 'Enter') {
        setShowURL(true);
      }
    }
    const keyEscHandler = (event) => {
      if (event.key === 'Escape') {
        setShowURL(false);
      }
    }

    document.addEventListener('keydown', keyEnterHandler)
    document.addEventListener('keydown', keyEscHandler)

    init();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    if (typeof(formData.url) !== 'undefined') {
      setSubmitting(true);
      axios({
        method: 'get',
        url: formData.url,
        withCredentials: false,
      })
        .then(resp => {
          let $ = cheerio.load(resp.data);
          const t = $('html *').contents().map(function() {
            return (this.type === 'text') ? $(this).text()+' ' : '';
          }).get().join('');
          setText(t);
        })
      setSubmitting(false);
    };
  };

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const BoxURL = () => {
    return (
      <div className='grid grid-cols-10'>
        <form className='col-start-4 col-span-4' method='post' onSubmit={handleSubmit}>
          <fieldset disabled={submitting}>
            <input className='w-full border mb-4 mt-4 pb-2 pt-2 text-2xl' autoFocus='autofocus' name='url' onChange={handleChange} value={formData.url || ''} placeholder=' url...'/>
          </fieldset>
        </form>
      </div>
    )
  }

  return (
    <main className="">
      {showURL && <BoxURL />}
      <div className='grid grid-cols-10 gap-4'>
        <div className='col-start-4 col-span-2 bg-black padding p-4 text-4xl font-serif text-substack font-bold leading-tight'>
          {text}        
        </div>
        <div className='col-start-6 col-span-2 bg-black padding p-4 text-4xl font-serif text-substack font-bold leading-tight'>
          {text}
        </div>
      </div>
    </main>
  );
}
