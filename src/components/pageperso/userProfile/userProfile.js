import React, { useEffect, useState } from "react";
import Menu from "../../../assets/menu/menu";
import "./userProfile.css";

function UserProfile() {
  //on crée une variable à vide pour stocker les données du profil
  const [userProfile, setUserProfile] = useState({});
  // on crée une fonction pour récupérérer les données du profil
  const getProfile = async () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/user",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
        setUserProfile(response);
      });
  };
  //on crée une fonction pour la modification du profil
  const modifProfile = async () => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/user",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {});
  };
  //on affiche les informations de l'utilisateur sur la page
  const renderProfile = () => {
    return (
      <div>
        <div className="userInfo">
          <p>
            <b>Prénom:</b> {userProfile.firstname}{" "}
          </p>
          <p>
            <b>Nom de famille:</b> {userProfile.lastname}{" "}
          </p>
          <p>
            <b>Adresse mail:</b> {userProfile.email}{" "}
          </p>
          <p>
            <b>Profession:</b>
          </p>
          <p>
            <b>Age: </b>
          </p>
          {/*On ajoute un bouton modifier au profil pour changer les informations de l'utilisateur */}
          <button className="modifButton" onClick={modifProfile}>
            Modifier le profil
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    console.log("userProfile", userProfile);
  }, [userProfile]);
  return (
    <div className="userWrapper">
      <Menu />
      <h1 className="userTitle">Mes informations personnelles</h1>
      {renderProfile()}
    </div>
  );
}

export default UserProfile;
