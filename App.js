import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Login from "./Login";
import Courses from './Courses';
import Dashboard from "./Dashboard";
import './App.css';

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common.js";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then(response => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
          <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/">MAQ Coursera</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="courses">Courses</Nav.Link>
                  <Nav.Link href="features">Features</Nav.Link>
                </Nav>
                <Nav>
      <Nav.Link href="/">Logout</Nav.Link>
    </Nav>
              </Navbar.Collapse>
            </Navbar>
            {/* <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small> */}
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/courses" component={Courses} />
              <PrivateRoute path="/features" component={Dashboard} />
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
