import React from "react";
import Photo from "./Photo";

const PhotoList = () => {
    // const results = props.data;
    // let photos = result.map(photo => <Photo url={photo} key={photo.id}/>)
    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
               <Photo />
               {/* {photos} */}
               
           {/* <!-- Not Found --> */}
               
            </ul>
        </div>
    )
}

export default PhotoList;