import React, { useEffect, useState } from "react";
import Menu from "../../../assets/menu/menu";
import "./userProfile.css";
import Footer from "../../../assets/footer/footer";

function UserProfile() {
  //on crée une variable à vide pour stocker les données du profil
  const [userProfile, setUserProfile] = useState({});
  //on crée une fonction pour récupérérer les données du profil
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
        setUserProfile(response);
      });
  };

  //on crée une fonction pour activer la modification du profil
  const [modifOn, setModifOn] = useState(false);

  //au clic sur le bouton modifier, un formulaire de modification remplace l'affichage
  const modifProfile = () => {
    setModifOn(!modifOn);
  };
  //on crée un event onchange sur les inputs et on envoie leur valeur dans la variable userProfile
  const handleModif = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };
  //on envoie une requête PUT pour modifier le profil
  const confirmModif = async (e) => {
    e.preventDefault();
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("@userToken")}`,
      },
      body: JSON.stringify({
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        email: userProfile.email,
        age: userProfile.age,
        occupation: userProfile.occupation,
      }),
    };
    await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/dev-factory/user",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.success == true) {
          getProfile();
          setModifOn(!modifOn);
        } else {
          alert(response.message);
        }
      });
  };

  //on affiche les informations de l'utilisateur sur la page
  const renderProfile = () => {
    return (
      <div>
        {modifOn ? (
          <div className="modifForm">
            <input
              required
              value={userProfile.firstname}
              type="text"
              onChange={handleModif}
              name="firstname"
              placeholder="Prénom"
            />
            <input
              required
              value={userProfile.lastname}
              onChange={handleModif}
              type="text"
              name="lastname"
              placeholder="Nom de famille"
            />
            <input
              required
              value={userProfile.email}
              onChange={handleModif}
              type="email"
              name="email"
              placeholder="Adresse email"
            />
            <input
              required
              value={userProfile.age}
              onChange={handleModif}
              type="text"
              name="age"
              placeholder="Age"
            />
            <input
              required
              value={userProfile.occupation}
              onChange={handleModif}
              type="text"
              name="occupation"
              placeholder="Occupation"
            />
            <button className="modifButton" onClick={confirmModif}>
              Enregistrer
            </button>
          </div>
        ) : (
          <div className="userInfo">
            <p>
              <b>Prénom:</b> {userProfile.firstname}
            </p>
            <p>
              <b>Nom de famille:</b> {userProfile.lastname}
            </p>
            <p>
              <b>Adresse mail:</b> {userProfile.email}
            </p>
            <p>
              <b>Occupation:</b> {userProfile.occupation}
            </p>
            <p>
              <b>Age:</b> {userProfile.age}
            </p>
            {/*On ajoute un bouton modifier au profil pour changer les informations de l'utilisateur */}
            <button className="modifButton" onClick={modifProfile}>
              <i className="fa-solid fa-pencil"></i> Modifier le profil
            </button>
          </div>
        )}
      </div>
    );
  };
  //useEffects
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
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UserProfile;
