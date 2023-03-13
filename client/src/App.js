import "./App.css";
import { useState, useEffect, useContext } from "react";
import Home from "./Pages/Home/Home";
import Navigation from "./Component/Navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { UserProvider } from "./Context/userContext";
import UserProfile from "./Pages/UserProfile/UserProfile";
import { UserContext } from "./Context/userContext";
import CreateListing from "./Pages/CreateListing/CreateListing";
import AddToCart from "./Pages/AddToCart/AddToCart";
import PreviewProduct from "./Pages/PreviewProduct/PreviewProduct";
import ProductsByCategory from "./Pages/ProductsByCategory/ProductsByCategory";
import SellingPage from "./Pages/SellingPage/SellingPage";
import Messenger from "./Pages/Messenger/Messenger";
import DraftedItems from "./Pages/DraftedItems/DraftedItems";
import Favorites from "./Pages/Favorites/Favorites";
import AboutUs from "./Pages/AboutUs/AboutUs";
import StripeContainer from "./Pages/Stripe/StripeContainer";

function App() {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  useEffect(() => {
    console.log(isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <Router>
      <UserProvider>
        {/* <Navigation></Navigation> */}
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/register">
              {/* IF THE USER IS LOGGED IN, YOU CAN NOT GO TO THE SIGNIN OR REGISTER PAGE */}
              {/* {isUserLoggedIN ? (
                <Redirect to="/"> </Redirect>
              ) : (
                <SignUp></SignUp>
              )} */}
              <SignUp></SignUp>
            </Route>

            <Route exact path="/login">
              {/* IF THE USER IS LOGGED IN, YOU CAN NOT GO TO THE SIGNIN OR REGISTER PAGE */}
              {/* {isUserLoggedIN ? <Redirect to="/"> </Redirect> : <Login></Login>} */}
              <Login
                setisUserLoggedIn={setisUserLoggedIn}
                isUserLoggedIn={isUserLoggedIn}
              ></Login>
            </Route>
            <Route exact path="/aboutus">
              <AboutUs></AboutUs>
            </Route>

            <Route exact path="/userprofile">
              {isUserLoggedIn ? (
                <UserProfile></UserProfile>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route exact path="/userprofile/createlisting">
              {isUserLoggedIn ? (
                <CreateListing></CreateListing>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route exact path="/userprofile/selling">
              {isUserLoggedIn ? (
                <SellingPage></SellingPage>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route exact path="/userprofile/favorites">
              {isUserLoggedIn ? (
                <Favorites></Favorites>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route exact path="/cart">
              <AddToCart></AddToCart>
            </Route>

            <Route exact path="/:productId">
              <PreviewProduct></PreviewProduct>
            </Route>

            <Route exact path="/category/:categoryType">
              <ProductsByCategory></ProductsByCategory>
            </Route>

            <Route exact path="/userprofile/messenger">
              {isUserLoggedIn ? (
                <Messenger></Messenger>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route exact path="/userprofile/messenger/:conversationId">
              {isUserLoggedIn ? (
                <Messenger></Messenger>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            {/* drafted products */}
            <Route exact path="/drafts/:draftId">
              <CreateListing draft={true}></CreateListing>
            </Route>

            {/* edit product */}
            <Route exact path="/edit/:draftId">
              <CreateListing edit={true}></CreateListing>
            </Route>

            <Route exact path="/buy/product/stripeForm">
              <StripeContainer></StripeContainer>
            </Route>

            <Route
              path="/projectlink/gitlink"
              component={() => {
                window.location.href =
                  "https://github.com/Shivamdahiya63125/capstoneProject";
                return null;
              }}
            />

            <Route
              path="/projectlink/livelink"
              component={() => {
                window.location.href =
                  "https://capstone-client-b1q59y1a6-shivamdahiya63125.vercel.app/";
                return null;
              }}
            />
          </Switch>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
