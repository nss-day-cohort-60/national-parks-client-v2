import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";

export const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("frodo@baggins.com");
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

         navigate("/home");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset>
              <label htmlFor="inputEmail"> Email address </label>
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
          <h6>Not a member yet?</h6>
          <Link to={"/register"}>Register Here</Link>
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
