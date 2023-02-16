import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const LoginModal = ({ show, handleClose, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const handleLogin = () => {
    handleClose();
    fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.valid) {
                    localStorage.setItem("np_token", JSON.stringify({
                      id: authInfo.id,
                      name: authInfo.first_name,
                      staff: authInfo.is_staff,
                      token: authInfo.token
                    }))
                    setLoggedIn(true)
                    navigate("/home")
        } else {
          window.alert("Invalid login");
        }
      });
  };
  const handleExit = () => {
      setEmail('')
  }


  return (
    <>
      <Modal className="modal__container" show={show} onHide={handleClose} onExit={handleExit}centered>
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
