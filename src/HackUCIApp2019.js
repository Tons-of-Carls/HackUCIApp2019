import React, { Component } from 'react';
import './bootstrap-4.3.1-dist/css/bootstrap.css';
import './HackUCIApp2019.css';
import * as EmailValidator from 'email-validator';
/*
@page HackUCIApp2019

Allows users to submit a form with their first name, last name, email, and a message.

*/

class HackUCIApp2019 extends Component {

  constructor(props){
    super(props);
    this.state = {
      first: "",
      last: "",
      email: "",
      message: "",
      messageLength: 0,
      overCharCap: false
    };
    this.charCap = 500;
  }

  onFirstNameChange = ()=>{
    let fn = document.getElementById("fn").value;
    this.setState({
      first: fn
    });
  };

  onLastNameChange = ()=>{
    let ln = document.getElementById("ln").value;
    this.setState({
      last: ln
    });
  };

  onEmailChange = ()=>{
    let email = document.getElementById("email").value;
    this.setState({
      email: email
    });
  };

  onMessageChange = ()=>{
    let message = document.getElementById("message").value;
    this.setState({
      message: message,
      messageLength: message.length,
      overCharCap: message.length > this.charCap
    });
  };

  onSubmit = ()=>{
    if(!this.state.overCharCap &&
      this.state.first.trim() &&
      this.state.last.trim() &&
      this.state.email.trim() &&
      this.state.message.trim() &&
      EmailValidator.validate(this.state.email)){

      let body = `first=${encodeURI(this.state.first)}&`+
      `last=${encodeURI(this.state.last)}&`+
      `email=${encodeURI(this.state.email)}&`+
      `message=${encodeURI(this.state.message)}`;

      console.log(body);

      fetch("https://tranquil-lowlands-24043.herokuapp.com/feedback",
        {
          method: "POST",
          body: body,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((response)=>{
          response.json().then((resp)=>{
            console.log(resp);
          });
      });
    }
  };

  render() {
    return (
      <div className="d-flex flex-column col-6 offset-3 form-container">
        <h1 className="header-text"><strong>Feedback</strong></h1>
        <input id="fn" className="form-control" type="text" name="FN" placeholder="First Name" onChange={this.onFirstNameChange}/>
        <input id="ln" className="form-control" type="text" name="LN" placeholder="Last Name" onChange={this.onLastNameChange}/>
        <input id="email" className="form-control" type="email" name="Email" placeholder="john@example.com" onChange={this.onEmailChange}/>
        <textarea id="message" className="form-control" name="Message" placeholder="Message" onChange={this.onMessageChange}/>
        <p className={!this.state.overCharCap ? "char-cap-valid" : "char-cap-invalid"}>{`${this.state.messageLength}/500`}</p>
        <button className="btn btn-primary btn-lg btn-block submit-button" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default HackUCIApp2019;
