import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

function Menu() {
  const logOut = () => {
    alert("Vous êtes hors ligne. A bientôt");
    localStorage.removeItem("@userToken");
  };
  return (
    <div>
      <div className="mainNavbar">
        {" "}
        <h2 className="mainLogo">DEV FACTORY</h2>
        <p>
          <Link to={"/pageperso"}>
            {" "}
            <i className="fa-solid fa-house"></i> Accueil
          </Link>
        </p>
        <p>
          <Link to="/myprofile">
            <i className="fa-solid fa-user"></i> Mon profil
          </Link>
        </p>
        <p onClick={logOut}>
          <Link to="/">
            {" "}
            <i className="fa-solid fa-power-off"></i> Se déconnecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Menu;
