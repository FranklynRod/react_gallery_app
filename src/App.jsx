import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import PhotoNotFound from "./components/PhotoNotFound";
import apiKey from "./config";
// import axios from 'axios';




function App() {
  const [pics, setPics] = useState([]);
  useEffect(() => {
   
    fetch(`https://api.flickr.com/services/rest/?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((responseData) => setPics(responseData.data))
    .catch(error => console.log("Error fetching and parsing data", error));
  }, []);
  return (
    <div>
      <Search />
      <Nav />
      {/* <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/cats" element={<LandingPage/>} />
      <Route path="/dogs" element={<LandingPage/>} />
      <Route path="/computers" element={<LandingPage/>} />
      <Route path="/search/:query" element={<FourZeroFour/>} />
      <Route path="/*" element={<PhotoNotFound/>} />
      </Routes> */}
      <PhotoList />

    </div>
  )
}

export default App
