import {useState, useEffect} from "react";
import Photo from "./Photo";
import { useParams } from "react-router-dom";
import PhotoNotFound from "./PhotoNotFound";
import apiKey from "../config";

const PhotoList = (props) => {
    //Initialize and Set Variables with UseState
    const [photos, setPhotos] = useState([]);
    // const [query, setQuery] = useState(null)
    const [loading, setLoading] = useState(true);
    const {query} = useParams();

    //Fetch data from API
    const fetchData = (query) => {
        setLoading(true)
        //to prevent race condition which causes incorrect/delayed data to be displayed
        let activeFetch = true;
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
          .then((response) => response.json())
          .then((responseData) => {
            if (activeFetch) {
              if (query) {
                console.log("hello",responseData)
                console.log(query,"hello")
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
    //Passing down the data to render photos
    const results = props.data;
    let pictures;
    if (photos) {
        photos.length > 0 ? pictures = photos.map(image => <Photo key={image.id} url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} alt={image.title} />) : pictures = <PhotoNotFound />
    }

    //Fetch Data when query or static route buttons values are changed
    useEffect(() => {
        if (props.topic){
            fetchData(props.topic)
        }else{
            fetchData(query)};
        }, [query,props.topic])

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {pictures}
            </ul>
        </div>
    )
}

export default PhotoList;