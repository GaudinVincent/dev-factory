import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

function Menu() {
  const logOut = () => {
    alert("Vous vous êtes déconnecté");
    localStorage.removeItem("@userToken");
  };
  return (
    <div>
      <div className="mainNavbar">
        <p>
          <Link to={"/pageperso"}>Accueil</Link>
        </p>
        <p>
          <Link to="/myprofile">Mon profil</Link>
        </p>
        <p onClick={logOut}>
          <Link to="/">Se déconnecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Menu;
