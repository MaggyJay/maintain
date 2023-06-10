import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home';
import SimpleMap from './pages/map';
import Journal from './pages/journal';
import Callback from "./pages/Callback";
import Auth from "./Auth/Auth";
import Nav from "./components/Nav";
import Profile from "./pages/profile.js"
import Resources from "./pages/resources"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <Router>
        <Nav auth={this.auth} />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<SimpleMap />} />
            <Route
              path="/callback"
              element={<Callback auth={this.auth} />}
            />
            <Route
              path="/journal"
              element={
                this.auth.isAuthenticated()
                  ? <Journal auth={this.auth} />
                  : <Navigate to="/" />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
