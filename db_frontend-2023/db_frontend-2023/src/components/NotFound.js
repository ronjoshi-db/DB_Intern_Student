import React from "react";
import warning from '../images/exclamation-image.webp';

const NotFound = () =>{
    return (
        <div className="danger">
            <p>The Page you have requested has not been found</p>
            <img src={warning} className="App-small" alt="Warning Icon"/>
        </div>
    )
}

export default NotFound;