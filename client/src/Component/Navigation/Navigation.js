import { React, useContext, useState, useEffect } from "react";
import "./NavigationStyle.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  CgProfile,
  CgSearch,
  CgLogOff,
  CgShoppingCart,
  CgClose,
} from "react-icons/cg";
import { UserContext } from "../../Context/userContext";
import Header from "../Header/Header";
import { AiOutlineMenu } from "react-icons/ai";
const Navigation = ({
  userProfile,
  setisDisplayMobileMenu,
  isDisplayMobileMenu,
}) => {
  const [globalUser, setglobalUser] = useContext(UserContext);

  const history = useHistory();
  const [isDisplayCategory, setisDisplayCategory] = useState(false);
  const [isMobileSidebarActive, setisMobileSidebarActive] = useState(false);

  const logOutUser = () => {
    console.log("log out");
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
  };

  const displayCategory = () => {
    setisDisplayCategory(!isDisplayCategory);
  };

  const openUserMenuOption = () => {
    setisMobileSidebarActive(!isMobileSidebarActive);
    console.log(isMobileSidebarActive);
  };

  useEffect(() => {
    setisDisplayCategory(false);
  }, [isMobileSidebarActive]);

  return (
    <nav className="navigation">
      <div className="nav-container1">
        <div className="language">English</div>

        <header className="nav-header">
          <Link to="/">
            <img
              className="nav-logo"
              alt="logo"
              src="https://www.logolynx.com/images/logolynx/97/971a6bc2db00b7a99ad2fef0e0a1b246.png"
            ></img>
            <img
              className="nav-logo-mobile"
              alt="logo-mobile"
              src="https://www.pngitem.com/pimgs/m/529-5295750_facebook-marketplace-01-marketplace-facebook-logo-png-transparent.png"
            ></img>
          </Link>
        </header>

        <div className="nav-container1-side">
          {/* <button>Search</button>{" "} */}
          <span className="search-container">
            <CgSearch className="icon"></CgSearch> Search
          </span>

          {globalUser === null ? (
            <>
              <Link to="/login">
                {" "}
                <CgProfile className="icon"></CgProfile>
              </Link>
            </>
          ) : (
            <span className="nav-user-container">
              {globalUser.avatarString ? (
                <div className="nav-profile-pic-container">
                  <Link to="/userprofile">
                    {/* <img
                      className="nav-profile-pic"
                      src={require(`../../Static/uploads/${globalUser.avatarString}`)}
                    ></img> */}

                    <img
                      className="nav-profile-pic"
                      src={globalUser.avatarString}
                    ></img>
                  </Link>
                </div>
              ) : (
                <Link to="/userprofile">{globalUser.name}</Link>
              )}

              <CgLogOff
                className="logout-button"
                onClick={logOutUser}
              ></CgLogOff>
            </span>
          )}

          <AiOutlineMenu
            className="menu-icon"
            onClick={openUserMenuOption}
          ></AiOutlineMenu>
        </div>
      </div>

      <div
        className={
          isMobileSidebarActive
            ? "mobile-navigation mobile-navigation-active"
            : "mobile-navigation mobile-navigation-inactive"
        }
      >
        <div className="close-button">
          <CgClose onClick={openUserMenuOption}></CgClose>
        </div>
        <div className="user-profile-mobile-container">
          {globalUser ? (
            globalUser.avatarString ? (
              <img
                className="user-profile-mobile"
                src={globalUser.avatarString}
              ></img>
            ) : null
          ) : null}
        </div>

        <div className="mobile-nav-item-header">Category</div>

        <div className="user-profile-navigation-links">
          <ul className="mobile-nav-container2-list">
            <li className="mobile-nav-container2-link">
              {" "}
              <Link to={`/category/electronics`}>Electronics</Link>{" "}
            </li>

            <li className="mobile-nav-container2-link">
              <Link to="/category/homegoods">Home Goods </Link>
            </li>
            <li className="mobile-nav-container2-link">
              {" "}
              <Link to="/category/entertainment">Entertainment</Link>
            </li>
            <li className="mobile-nav-container2-link">
              {" "}
              <Link to="/category/sports">Sports</Link>
            </li>
            <li className="mobile-nav-container2-link">
              {" "}
              <Link to="/category/toys">Toys</Link>
            </li>

            {globalUser ? (
              <li
                className="mobile-nav-container2-link-logout"
                onClick={logOutUser}
              >
                Logout
              </li>
            ) : (
              <Link className="mobile-nav-container2-link-logout" to="/login">
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>

      {/* <div className="mobile-nav-container2">
        <span
          className="select-category-button"
          onClick={() => displayCategory()}
        >
          Select Category
        </span>

        <div className="categories-container">
          {isDisplayCategory ? (
            <ul className="mobile-nav-container2-list">
              <li className="mobile-nav-container2-link">
                {" "}
                <Link to={`/category/${categoryType}`}>Electronics</Link>{" "}
              </li>

              <li className="mobile-nav-container2-link">
                <Link to="/category/homegoods">Home Goods </Link>
              </li>
              <li className="mobile-nav-container2-link">
                {" "}
                <Link to="/category/entertainment">Entertainment</Link>
              </li>
              <li className="mobile-nav-container2-link">
                {" "}
                <Link to="/category/sports">Sports</Link>
              </li>
              <li className="mobile-nav-container2-link">
                {" "}
                <Link to="/category/toys">Toys</Link>
              </li>
            </ul>
          ) : null}
        </div>
      </div> */}
    </nav>
  );
};

export default Navigation;
