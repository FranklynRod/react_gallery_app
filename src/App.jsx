import { useState } from 'react'
import './App.css'
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Search />
      <PhotoList />
      <Nav />
    </div>
  )
}

export default App
