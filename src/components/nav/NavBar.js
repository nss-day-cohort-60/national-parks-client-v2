import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()

    return (
      <ul className="navbar">
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
          <li className="navbar__item navbar__logout">
            <Link
              className="navbar__link"
              to=""
              onClick={() => {
                localStorage.removeItem("np_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          <li className="navbar__item active">
            <Link className="navbar__link" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    );
}

