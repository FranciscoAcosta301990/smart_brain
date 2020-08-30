import React from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import SignIn from "./components/signIn/SignIn";
import Registration from "./components/registration/Registration";
import Rank from "./components/rank/Rank";
import ImageURL from "./components/imageURL/ImageURL";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import "tachyons";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      desity: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends React.Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (userData) => {
    this.setState({user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }})
  }

  drawFaceLocation = (response) => {
    const detectedFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: detectedFace.left_col * width,
      topRow: detectedFace.top_row * height,
      rightCol: width - (detectedFace.right_col * width),
      bottomRow: height - (detectedFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxParameters) => {
    console.log(boxParameters);
    this.setState({box: boxParameters});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch("https://radiant-ridge-07819.herokuapp.com/imageurl", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
      if (response) {
        fetch("https://radiant-ridge-07819.herokuapp.com/image", {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
      }
      this.displayFaceBox(this.drawFaceLocation(response))
    })
    .catch( err => console.log(err) );
  }

  onRouteChange = (newRoute) => {
    if (newRoute === "signin") {
      this.setState(initialState);
    } else if (newRoute === "main") {
      this.setState({isSignIn: true});
    }
    this.setState({route: newRoute});
  }

  render () {
    const {isSignIn, imageURL, route, box, user} = this.state;
    const {name, entries} = user;
    switch (route) {
      case "main":
        return (
          <div className = "App">
            <Particles className = "particles"
              params = {particlesOptions}
            />
            <Navigation onRouteChange = {this.onRouteChange} isSignIn = {isSignIn} />
            <Rank name = {name} entries = {entries} />
            <ImageURL
              onInputChange = {this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceRecognition box = {box} imageURL = {imageURL} />
          </div>
        );
      case "signin":
        return (
          <div className = "App">
            <Particles className = "particles"
              params = {particlesOptions}
            />
            <Navigation onRouteChange = {this.onRouteChange} isSignIn = {isSignIn} />
            <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}  />
          </div>
        );
      case "register":
        return(
          <div className = "App">
            <Particles className = "particles"
              params = {particlesOptions}
            />
            <Navigation onRouteChange = {this.onRouteChange} isSignIn = {isSignIn} />
            <Registration onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
          </div> 
        );
      default:
        console.log("There was an error.")
    }
  }
}

export default App;
