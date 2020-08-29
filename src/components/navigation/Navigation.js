import React from "react";

const Navigation = ({onRouteChange, isSignIn}) => {
    if (isSignIn) {
        return (
         <nav className = "shadow-2" style = {{ display: "flex", justifyContent: "flex-end" }} >
            <p onClick = {() => onRouteChange("signin")}  className = "ph3 pv2 link dim black db pointer mr2" >
                Sign out
            </p>
        </nav>
        );
    } else {
        return (
            <nav className = "shadow-2" style = {{ display: "flex", justifyContent: "flex-end" }} >
               <p onClick = {() => onRouteChange("signin")}  className = "ph3 pv2 link dim black db pointer mr2" >
                   Sign in
               </p>
               <p onClick = {() => onRouteChange("register")}  className = "ph3 pv2 link dim black db pointer mr2" >
                   Register
               </p>
           </nav>
        );
    }
        
}

export default Navigation;