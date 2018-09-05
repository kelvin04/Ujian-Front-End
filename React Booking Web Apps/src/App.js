import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MovieSelect from './components/MovieSelect';
import Movie1 from './components/Movie1';
import Movie2 from './components/Movie2';
import Movie3 from './components/Movie3';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';

class App extends Component {
  state = { kucingIn: false, namakucing : "Briana" }

  onKucingBtnPress = () => {
    this.setState({ kucingIn: true, namakucing: "Rihanna" });
  }
 
  render() {
    var obj1 = { text : "BDO Image 1"};
    console.log("render dijalankan");
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={HomePage}/>
        <Route path="/movie1" component={Movie1}/>
        <Route path="/movie2" component={Movie2}/>
        <Route path="/movie3" component={Movie3}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage}/>
      </div>
    );
  }
}

export default App;
