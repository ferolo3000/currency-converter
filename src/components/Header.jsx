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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">NAME</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <Link to="/about/">About</Link>
            </div>
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