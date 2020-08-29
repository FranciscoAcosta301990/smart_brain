import React from "react";
import "./ImageURL.css";

const ImageURL = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className = "f3">
                The Magic Brain will detect faces in your photos!
            </p>
            <div className = "center" >
                <div className = "pa4 br3 shadow-5 center form" >
                    <input className = "f4 pa2 w-70 center" type = "text" onChange = {onInputChange} />
                    <button
                        className = "w-30 f4 link ph3 pv dib white bg-light-purple"
                        onClick = {onButtonSubmit}
                    >Scan</button>
                </div>
            </div>
        </div>
    );
} 

export default ImageURL;