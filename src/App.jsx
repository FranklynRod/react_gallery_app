import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import PhotoNotFound from "./components/PhotoNotFound";
import apiKey from "./config";
// import axios from 'axios';




function App() {
  
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState("")
    useEffect(() => {
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then((response) => response.json())
      .then((responseData) => setPhotos(responseData.data))
      .catch(error => console.log("Error fetching and parsing data", error));
    }, [query]);

  //  const handleQueryCHange = 
 
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
