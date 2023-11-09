import { Route, Routes} from "react-router-dom";
import { useEffect, useState } from 'react';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import PhotoNotFound from "./components/PhotoNotFound";
import { useParams } from "react-router-dom";


function App() {
  
  return (
    <div>
      <Search />
      <Nav />
      <Routes>
        <Route path="/" element={<PhotoList />} />
      <Route path="/cats" element={<PhotoList topic={"cats"}/>} />
      <Route path="/dogs" element={<PhotoList topic={"dogs"} />}/>
      <Route path="/computers" element={<PhotoList topic={"computers"} />} />
        <Route path="/search/:query" element={<PhotoList />} />
        <Route path="*" element={<PhotoNotFound />} />
      </Routes>

    </div>
  )
}

export default App
