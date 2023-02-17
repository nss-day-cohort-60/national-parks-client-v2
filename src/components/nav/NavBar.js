import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { LoginModal } from "../auth/LoginModal";
import './NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


      useEffect(() => {
          const user = localStorage.getItem("np_token");
          if (user) {
            setName(JSON.parse(user).name);
          }
        }, [loggedIn]);

    return (
      <>
        <div className="top_bar">
          <img src="/np_logo2.png" className="navbar__logo" />
          <ul>
            <li className="navbar__item active">
              <Link className="navbar__link" to="/home">
                <h5>Home</h5>
              </Link>
            </li>

            <li className="navbar__item active">
              <Link className="navbar__link" to="/blogs">
                <h5>Blogs</h5>
              </Link>
            </li>
            <li className="navbar__item active">
              <Link className="navbar__link" to="/calendar">
                Events
              </Link>
            </li>
            {localStorage.getItem("np_token") ? (
              <>
                <li className="navbar__item navbar__logout">
                  <Link className="navbar__link" to="my-blogs">
                    <h5>My Blogs</h5>
                  </Link>
                </li>
                <li className="navbar__item navbar__logout">
                  <Link className="navbar__link" to="hub">
                    <h5>My Hub</h5>
                  </Link>
                </li>
                <li className="navbar__item navbar__logout">
                  <Link
                    className="navbar__link"
                    to=""
                    onClick={() => {
                      if (
                        window.confirm(
                          `${name}, do you really want to log out?`
                        )
                      ) {
                        setLoggedIn(false);
                        setName("");
                        localStorage.removeItem("np_token");
                        navigate("/", { replace: true });
                      }
                    }}
                  >
                    <h5>Logout</h5>
                  </Link>
                </li>
              </>
            ) : (
              <li className="navbar__item active">
                <Link className="navbar__link" onClick={handleShow}>
                  <h5>Login</h5>
                </Link>
              </li>
            )}
          </ul>
          <div className="welcome">{name ? `Welcome ${name}!` : ""}</div>
        </div>
        <LoginModal
          show={show}
          handleClose={handleClose}
          setLoggedIn={setLoggedIn}
        />
      </>
    );
}

