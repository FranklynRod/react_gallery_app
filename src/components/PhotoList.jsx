import React from "react";
import Photo from "./Photo";
import { useParams } from "react-router-dom";
import PhotoNotFound from "./PhotoNotFound";

const PhotoList = (props) => {
    const params = useParams();
    const results = props.data;
    let photos;
    results.length > 0 ? photos = results.map(image => <Photo key={image.id} url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} alt={image.title} />): photos = <PhotoNotFound />
    return (
        <div className="photo-container">
            {console.log(params)}
            <h2>Results</h2>
            <ul>
                {/* <Photo /> */}
                {photos}
            </ul>
        </div>
    )
}

export default PhotoList;