import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Converter from "./Converter"
import Stats from "./Stats";


const NotFound = () => {
    return <h2>404 Not Found</h2>;
  }

function Header() {
    return(
        <Router>
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/"><span style={{color: "#40BAA6"}}>CONVERTIR</span></Link>
            <Link to="/stats/" className="text-white">Statistics</Link>
        </nav>
        <Switch>
        <Route path="/" exact component={Converter} />
        <Route path="/stats/" component={Stats} />
        <Route component={NotFound} />
      </Switch>

        </Router>
        
    )
}

export default Header;