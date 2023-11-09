import React from "react";
import { NavLink } from "react-router-dom";



const Nav = (props) => {
    return (<nav className="main-nav">
    <ul>
      <li><NavLink to='/cats'  onClick={() => props.queryChange("cats")}>Cats</NavLink></li>
      <li><NavLink to='/dogs' onClick={() => props.queryChange("dogs")}>Dogs</NavLink></li>
      <li><NavLink to='/computers' onClick={() => props.queryChange("computers")}>Computers</NavLink></li>
    </ul>
  </nav>)
}

export default Nav;