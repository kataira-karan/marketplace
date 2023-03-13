import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  // rect hooks useState hook
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  const history = useHistory();
  const [errorMessage, seterrorMessage] = useState("");
  const singUpUser = async (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "" || user.name === "") {
      seterrorMessage("Input fields can not be empty");
    } else {
      var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
        seterrorMessage("Invalid Email Foramt.");
        return;
      }

      if (!strongRegex.test(user.password)) {
        seterrorMessage("Weak password");
        return;
      }
      const requestOptions = {
        crossDomain: true,
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };
      await fetch("http://13.58.147.80:8080/users/", requestOptions)
        .then((response) => {
          console.log(response);

          return response.json();
        })
        .then((data) => {
          if (data.success) {
            history.push("/login");
          } else {
            seterrorMessage(data.message);
          }
          console.log(data);
        });
    }
  };

  return (
    <form className="signup-form" onSubmit={singUpUser}>
      <header className="logo">Market Place</header>
      <header className="form-title"> Register </header>
      {errorMessage === "" ? (
        ""
      ) : (
        <span className="error-message"> {errorMessage}</span>
      )}
      <div className="rgister form-control">
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setuser({ ...user, name: e.target.value })}
        />
      </div>

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

      <input type="submit" value="Sign Up"></input>
      <span className="form-change">
        Alreay have an account? <Link to="/login">Singin</Link>{" "}
      </span>
    </form>
  );
};

export default SignUp;
