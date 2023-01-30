import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const LoginModal = ({ show, handleClose, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose()
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.hasOwnProperty("id")) {
          const user = foundUsers;
          localStorage.setItem(
            "np_user",
            JSON.stringify({
              id: user.id,
              name: user.first_name,
              staff: user.isRanger,
            })
          );
        setLoggedIn(true);
         navigate("/home");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <>
      <Modal className="modal__container" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset>
              <label htmlFor="inputEmail" className="modal__email">
                {" "}
                Enter your email address:{" "}
              </label>
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
          </form>
          <h6 className="modal__register">Not a member yet?</h6>
          <Link to={"/register"} onClick={handleClose}>
            Register Here
          </Link>
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
    </>
  );
};
