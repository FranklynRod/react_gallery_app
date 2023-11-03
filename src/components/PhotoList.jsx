import React from "react";
import Photo from "./Photo";

const PhotoList = () => {

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
               <Photo />
               
           {/* <!-- Not Found --> */}
               
            </ul>
        </div>
    )
}

export default PhotoList;