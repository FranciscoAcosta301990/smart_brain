import React from "react";

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  onRegistrationSubmit = () => {
    fetch("https://radiant-ridge-07819.herokuapp.com/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(userData => {
      if (userData.id) {
        this.props.loadUser(userData);
        this.props.onRouteChange("main");
      }
    })
  }

  render () {
    return (
      <article className = "br2 dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 shadow-2 center" >
        <main className = "pa4 black-80" >
          <div className = "measure" >
            <fieldset id = "sign_up" className = "ba b--transparent ph0 mh0" >
              <legend className = "f4 fw6 ph0 mho center" >Register</legend>
              <div className = "mt3" >
                <label className = "db fw6 lh-copy f6" htmlFor = "email-address" >Name</label>
                <input
                  className = "br1 pa2 input-reset ba bg-transparent hover-white w-100"
                  type = "text"
                  name = "name"
                  id = "name" 
                  onChange = {this.onNameChange}
                />
              </div>
              <div className = "mt3" >
                <label className = "db fw6 lh-copy f6" htmlFor = "email-address" >Email</label>
                <input
                  className = "br1 pa2 input-reset ba bg-transparent hover-white w-100"
                  type = "email"
                  name = "email-address"
                  id = "email-address"
                  onChange = {this.onEmailChange}
                />
              </div>
              <div className = "mv3" >
                <label className = "db fw6 lh-copy f6" htmlFor = "password" >Password</label>
                <input
                  className = "br1 b pa2 input-reset ba bg-transparent hover-white w-100"
                  type = "password"
                  name = "password"
                  id = "password"
                  onChange = {this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div>
              <input  onClick = {this.onRegistrationSubmit} className = "br1 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type = "submit" value = "Register" />
            </div>
          </div>
        </main>
      </article>
    );
  }
  
}

export default Registration;