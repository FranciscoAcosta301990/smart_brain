import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    fetch("https://radiant-ridge-07819.herokuapp.com/signin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("main");
      }
    });
  }

  render() {
    return (
      <article className = "br2 dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 shadow-2 center" >
        <main className = "pa4 black-80" >
          <div className = "measure" >
            <fieldset id = "sign_up" className = "ba b--transparent ph0 mh0" >
              <legend className = "f4 fw6 ph0 mho center" >Sing In</legend>
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
              <input onClick = {this.onSubmitSignIn}  className = "br1 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type = "submit" value = "Sign in" />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;