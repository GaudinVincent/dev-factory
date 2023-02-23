import React, { useEffect, useState } from "react";
import Menu from "../../../assets/menu/menu";

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
  //on affiche les informations de l'utilisateur
  const renderProfile = () => {
    return (
      <div>
        <p>
          <b>Prénom:</b> {userProfile.firstname}{" "}
        </p>
        <p>
          <b>Nom de famille:</b> {userProfile.lastname}{" "}
        </p>
        <p>
          <b>Adresse mail:</b> {userProfile.email}{" "}
        </p>
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
    <div>
      <Menu />
      <h1>Mes informations personnelles</h1>
      {renderProfile()}
    </div>
  );
}

export default UserProfile;
