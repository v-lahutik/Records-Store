import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaRecordVinyl, FaShoppingCart, FaUser, FaPlus} from "react-icons/fa";


function Header() {
  return (
    <div className="navbar">
      <div className="navLeft">
        <NavLink to="/"><FaHome /> </NavLink>
        <NavLink to="/records"><FaRecordVinyl /></NavLink>
      </div>
      <NavLink to="/addRecord"><FaPlus /></NavLink>
      <div className="navRight">
        <NavLink to="/user"><FaUser /></NavLink>
        <NavLink to="/cart"><FaShoppingCart /></NavLink>
      </div>
    </div>
  );
}

export default Header;
