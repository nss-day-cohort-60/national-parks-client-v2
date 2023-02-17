import { useEffect, useState } from "react";
import "./favorites.css";

export const FavoriteBtn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("np_token");
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  return (
    <>
      {loggedIn ? (
        <button className="favorite-btn">
          <p>Favorite</p>{" "}
        </button>
      ) : (
        ""
      )}
    </>
  );
};
