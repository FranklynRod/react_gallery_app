import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import PhotoNotFound from "./components/PhotoNotFound";
import apiKey from "./config";
import { Navigate } from "react-router-dom";


function App() {
  //Initialize and Set Variables with UseState
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState(null)
  const [loading, setLoading] = useState(true);
  // const [cats, setCats] = useState([]);
  // const [dogs, setDogs] = useState([]);
  // const [computers, setComputers] = useState([]);

  //Get current location and extract search query
const location = useLocation();
const searchQuery = location.pathname.split("/search/")[1];

  //UseEffect to sync with external system such as fetch data from API

  
  const fetchData = (query) => {
      console.log(query)
      //to prevent race condition which causes incorrect/delayed data to be displayed
      setLoading(true)
      let activeFetch = true;
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then((response) => response.json())
        .then((responseData) => {
          if (activeFetch) {
            if (query) {
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
  useEffect(() => {
    //Update query state with search query from URL
    if (searchQuery) {
    setQuery(searchQuery);
    } else {
    setQuery(null);
    }
    }, [location]);

  useEffect(() => {
    fetchData(query);
    }, [query])
  //Function to handle updated query
  const handleQueryChange = (query) => {
    setQuery(query);
    fetchData(query);
  }

//  useEffect(() => {  
//   if (!dogs.length){
//     fetchData("dogs");
//   } if (!cats.length){
//     fetchData("cats");
//   } if (!computers.length) {
//     fetchData("computers");
//   }
//   }, [dogs.length, cats.length, computers.length]);

  //props passed down to child components
  return (
    <div>
      <Search queryChange={handleQueryChange} />
      <Nav queryChange={handleQueryChange}/>
      <Routes>
        <Route path="/" element={<PhotoList />} />
      <Route path="/cats" element={<PhotoList loading={loading} data={photos} query={"cats"} queryChange={handleQueryChange} />} />
      <Route path="/dogs" element={<PhotoList loading={loading} data={photos} query={"dogs"} queryChange={handleQueryChange} />}/>
      <Route path="/computers" element={<PhotoList loading={loading} data={photos} query={"computers"} queryChange={handleQueryChange}/>} />
        <Route path="/search/:query" element={<PhotoList loading={loading} data={photos} queryChange={handleQueryChange} />} />
        <Route path="*" element={<PhotoNotFound />} />
      </Routes>

      {/* Displays loading message before attempting to display fetched data */}
      {/* {(loading)
        ? <p>Loading ...</p> : <PhotoList data={photos} />
      } */}

    </div>
  )
}

export default App
