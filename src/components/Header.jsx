import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home"
import About from "./About";


const NotFound = () => {
    return <h2>404 Not Found</h2>;
  }

function Header() {
    return(
        <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">CONVERTIR</Link>
            <Link to="/about/" className="text-white">About</Link>
        </nav>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route component={NotFound} />
      </Switch>

        </Router>
        
    )
}

export default Header;