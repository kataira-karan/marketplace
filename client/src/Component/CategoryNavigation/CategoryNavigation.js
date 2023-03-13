import "../Navigation/NavigationStyle.css";
import { React, useContext, useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { CgProfile, CgSearch, CgLogOff, CgShoppingCart } from "react-icons/cg";
import { UserContext } from "../../Context/userContext";
import Header from "../Header/Header";

const CategoryNavigation = () => {
  return (
    <div className="nav-container2">
      <ul className="nav-container2-list">
        <li className="nav-container2-link">
          {" "}
          <Link to={`/category/electronics`}>Electronics</Link>{" "}
        </li>
        <li className="nav-container2-link">
          <Link to="/category/homegood">Home Goods </Link>
        </li>
        <li className="nav-container2-link">
          {" "}
          <Link to="/category/entertainment">Entertainment</Link>
        </li>
        <li className="nav-container2-link">
          {" "}
          <Link to="/category/sports">Sports</Link>
        </li>
        <li className="nav-container2-link">
          {" "}
          <Link to="/category/toys">Toys</Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryNavigation;
