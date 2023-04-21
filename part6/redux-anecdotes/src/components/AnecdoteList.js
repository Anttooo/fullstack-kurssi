import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const anecdotes = useSelector(state => {
    if (state.filter) {
      const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.startsWith(state.filter))
      return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    }
    else {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [anecdotes, scrollPosition]);
  
  return (
    <div className="pb-40">
      {anecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote}/>
      )}
    </div>
  )
}

export default AnecdoteList