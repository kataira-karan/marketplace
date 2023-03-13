import { React, useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const Login = (props) => {
  const { setisUserLoggedIn, isUserLoggedIn } = props;
  const [user, setuser] = useState({ email: "", password: "" });
  const history = useHistory();
  const [globalUser, setglobalUser, isUserLoggedIN, setisUserLoggedIN] =
    useContext(UserContext);

  const [isInputFieldEmpty, setisInputFieldEmpty] = useState(false);
  // const [setErrorMessage, setsetErrorMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      setisInputFieldEmpty(true);
      seterrorMessage("Email or password field can not be empty");
    } else {
      console.log(user);
      const requestOptions = {
        crossDomain: true,
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };
      await fetch("http://13.58.147.80:8080/users/login", requestOptions)
        .then((response) => {
          console.log(response);

          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setglobalUser(data);
            // SETTING UP THE DATA IN THE LOCAL STORAGE
            //  WHEN WE CLOSE THE TAB AND REOPEN THE WEBSITE
            // WE WILL USE THIS DATA TO SHOW THAT THERE IS A LOGGED IN USER
            setisUserLoggedIN(true);
            setisUserLoggedIn(true);

            console.log(isUserLoggedIn);
            localStorage.setItem("user", JSON.stringify(data));
            history.push("/");
          } else {
            console.log(data);
            seterrorMessage(data.message);
          }
        });
    }
  };

  useEffect(() => {}, []);

  return (
    <form className="signup-form" onSubmit={loginUser}>
      <header className="logo">Market Place</header>
      <header className="form-title"> login </header>
      {/* {isInputFieldEmpty ? "Email or password field can not be empty" : ""} */}
      {errorMessage === "" ? (
        ""
      ) : (
        <span className="error-message"> {errorMessage}</span>
      )}

      <div className="rgister form-control">
        <input
          className="register-input"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="rgister form-control">
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
      </div>

      <input type="submit" value="Login"></input>
      <span className="form-change">
        Don't have an account? <Link to="/register">Register</Link>{" "}
      </span>
    </form>
  );
};

export default Login;
