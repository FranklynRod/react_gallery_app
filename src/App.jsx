import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import PhotoNotFound from "./components/PhotoNotFound";
import apiKey from "./config";


function App() {

  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("dogs")
  useEffect(() => {
    let activeFetch = true;
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then((response) => response.json())
      .then((responseData) => {
        if (activeFetch) {
          setPhotos(responseData.photos.photo);
        }
      })
      .catch(error => console.log("Error fetching and parsing data", error));

    return () => {
      activeFetch = false;
    };
  }, [query]);


const handleQueryChange = (searchText) => {
  setQuery(searchText);
}


  return (
    <div>
      <Search queryChange={handleQueryChange}/>
      <Nav />
      <Routes>
      {/* <Route path="/" element={<LandingPage/>} />
      <Route path="/cats" element={<cats/>} />
      <Route path="/dogs" element={<LandingPage/>} />
      <Route path="/computers" element={<LandingPage/>} /> */}
      <Route path="/search/:query" element={<PhotoList queryChange={handleQueryChange}/>} />
      <Route path="*" element={<PhotoNotFound/>} />
      </Routes>
   
      <PhotoList data={photos}/>

    </div>
  )
}

export default App
