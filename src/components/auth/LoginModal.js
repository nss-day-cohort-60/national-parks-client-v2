import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Spinner from "react-bootstrap/Spinner";

const BasicSpinner = ({ show }) => {
  const vis = show ? { display: "block" } : { display: "none" };
  return (
    <div style={vis}>
      Logging you in. Please Wait...
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export const LoginModal = ({ show, handleClose, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isRanger: false,
  });

  const handleLogin = () => {
    setShowSpinner(true);
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.valid) {
          localStorage.setItem(
            "np_token",
            JSON.stringify({
              id: authInfo.id,
              name: authInfo.first_name,
              staff: authInfo.is_staff,
              token: authInfo.token,
            })
          );
          setShowSpinner(false);
          handleClose();
          setLoggedIn(true);
          navigate("/home");
        } else {
          window.alert("Invalid login");
        }
      });
  };
  const handleExit = () => {
    setEmail("");
    setRegistered(false);
    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      isRanger: false,
    });
  };

  const registerNewUser = (e) => {
    e.preventDefault();
    return fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "np_token",
            JSON.stringify({
              id: createdUser.id,
              name: createdUser.first_name,
              staff: createdUser.is_staff,
              token: createdUser.token,
            })
          );
          navigate("/");
          window.location.reload(false);
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  const makeLoginForm = () => (
    <>
      <form>
        <fieldset>
          <label htmlFor="inputEmail" className="modal__email">Enter your email address:</label>
          <input
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password" className="modal__email">
        Enter your password:</label>
          <input
            onChange={updateUser}
            type="password"
            id="password"
            className="form-control"
            value={user.password}
            placeholder="Password"
            required
          />
        </fieldset>
      </form>
    </>
  );

  const makeRegisterForm = () => (
    <>
      <form className="form--login" onSubmit={registerNewUser}>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="first_name"
            className="form-control"
            value={user.first_name}
            placeholder="Enter your first name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="last_name"
            className="form-control"
            value={user.last_name}
            placeholder="Enter your last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            value={user.email}
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input
            onChange={updateUser}
            type="password"
            id="password"
            className="form-control"
            value={user.password}
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <input
            onChange={(evt) => {
              const copy = { ...user };
              copy.isRanger = evt.target.checked;
              setUser(copy);
            }}
            type="checkbox"
            id="isRanger"
          />
          <label htmlFor="email"> I am a Park Ranger </label>
        </fieldset>
        <fieldset>
          <button type="submit" className="register-button"> Register </button>
        </fieldset>
      </form>
    </>
  );

  return (
    <Modal
      className="modal__container"
      show={show}
      onHide={handleClose}
      onExit={handleExit}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{registered ? "Register" : "Login"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registered ? makeRegisterForm() : makeLoginForm()}
        <BasicSpinner show={showSpinner} />
        <h6 className="modal__register">
          {registered ? "Signed up already?" : "Not a member yet?"}
        </h6>
        <Button
          className="mt-2"
          onClick={() => {
            setRegistered((x) => !x);
          }}
        >
          {registered ? "Login" : "Register"} Here
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
