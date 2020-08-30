import React from "react";

const Rank = ({name, entries}) => {
    return (
        <div style = {{ marginTop: "100px" }}>
            <p className = "white f3" >
               {`${name}, your actual entry count is:`}
            </p>
            <p className = "white f1" style = {{ margin: "0" }} >
                {entries}
            </p>
        </div>
    );
}

export default Rank;