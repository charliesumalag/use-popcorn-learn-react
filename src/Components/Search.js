import React, { useEffect, useRef } from 'react'



const Search = ({query, setQuery}) => {

  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (e.code === 'Enter') {
        if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        setQuery('');
      }
    }
    document.addEventListener('keydown', callback)
    return () => document.removeEventListener('keydown', callback);
  },[setQuery])
    return (
        <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} ref={inputEl} />
      )
}

export default Search
