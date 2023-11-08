import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import PhotoNotFound from "./components/PhotoNotFound";
import apiKey from "./config";


function App() {
  //Initialize and Set Variables with UseState
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("dogs")
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [computers, setComputers] = useState([]);

  const setCatData = (data) => {
    setCats(data);
  };
  
  const setDogData = (data) => {
    setDogs(data);
  };
  
  const setComputerData = (data) => {
    setComputers(data);
  };
  //UseEffect to sync with external system such as fetch data from API
  const fetchData = (query) => {
    
      //to prevent race condition which causes incorrect/delayed data to be displayed
      setLoading(true)
      let activeFetch = true;
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then((response) => response.json())
        .then((responseData) => {
          if (activeFetch) {
            if (query === "cats") {
              setCatData(responseData.photos.photo);
            } else if (query === "dogs") {
              setDogData(responseData.photos.photo);
            } else if (query === "computer") {
              setComputerData
            } else {
              setPhotos(responseData.photos.photo);
            }
            setLoading(false)
          }
        })
        .catch(error => console.log("Error fetching and parsing data", error));
      //clean up function to set previous acitiveFetch to false before new fetch
      return () => {
        activeFetch = false;
      };
  

  }
  // useEffect(() => {   }, [query]);

  //Function to handle updated query
  const handleQueryChange = (searchText) => {
    setQuery(searchText);
    fetchData();
  }



  //props passed down to child components
  return (
    <div>
      <Search queryChange={handleQueryChange} />
      <Nav />
      <Routes>
        <Route path="/" element={<PhotoList/>} />
      <Route path="/cats" element={<PhotoList data={cats} query={cats}/>} />
      <Route path="/dogs" element={<PhotoList data={dogs} query={dogs}/>}/>
      <Route path="/computers" element={<PhotoList data={computers} query={computers}/>} />
        <Route path="/search/:query" element={<PhotoList queryChange={handleQueryChange} />} />
        <Route path="*" element={<PhotoNotFound />} />
      </Routes>

      {/* Displays loading message before attempting to display fetched data */}
      {(loading)
        ? <p>Loading ...</p> : <PhotoList data={photos} />
      }

    </div>
  )
}

export default App
