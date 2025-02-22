import * as React from "react";
import { useState } from 'react';

import { useStoreState } from '../../store/hooks';

export const SearchInput = ({focus, onSearch}) => {
  const searchQuery = useStoreState(state => state.search.query);

  const [ query, setQuery ] = useState(searchQuery.type == 'query' ? searchQuery.value : searchQuery.query || '');

  return (
    <>
      <div className="button-group -input">
        <input className="input" value={query} onChange={e => setQuery(e.target.value)} onKeyUp={(e) => e.keyCode === 13 && onSearch(query)} ref={input => input && focus && input.focus()} placeholder="Search..."/>
        <button className="button -default" onClick={() => onSearch(query)}><i className="fas fa-search"></i></button>
      </div>
    </>
  )
}