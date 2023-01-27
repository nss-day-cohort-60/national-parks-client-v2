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
          const user = localStorage.getItem("np_user");
          if (user) {
            console.log(user)
            setName(JSON.parse(user).name);
          }
        }, [loggedIn]);

    return (
      <>
        <div className="topbar">
          <ul>
            <li className="navbar__item active">
              <Link className="navbar__link" to="/home">
                Home
              </Link>
            </li>
            <li className="navbar__item active">
              <Link className="navbar__link" to="/blogs">
                Blogs
              </Link>
            </li>
            {localStorage.getItem("np_user") ? (
              <>
                <li className="navbar__item navbar__logout">
                  <Link className="navbar__link" to="">
                    My Blogs
                  </Link>
                </li>
                <li className="navbar__item navbar__logout">
                  <Link
                    className="navbar__link"
                    to=""
                    onClick={() => {
                      setLoggedIn(false)
                      setName("");
                      localStorage.removeItem("np_user");
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="navbar__item active">
                <Link className="navbar__link" onClick={handleShow}>
                  Login
                </Link>
              </li>
            )}
          </ul>
          <div className="welcome">{name ? `Welcome ${name}` : ""}</div>
        </div>
        <LoginModal show={show} handleClose={handleClose} setLoggedIn={setLoggedIn}/>
      </>
    );
}

