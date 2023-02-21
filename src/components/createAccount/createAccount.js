import React, { useState } from "react";

function CreateAccount() {
  //on crée une variable à vide contenant un objet
  const [userID, setUserID] = useState({});
  //on crée un événement sur les inputs pour stocker leur valeur dans l'objet userID
  const handleInput = (e) => {
    setUserID({ ...userID, [e.target.name]: e.target.value });
  };
  console.log(userID);
  //à la validation du formulaire, on envoie les informations de chaque input dans l'objet
  const handleSubmit = async (e) => {
    e.preventDefault();
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: userID.firstname,
        lastname: userID.lastname,
        email: userID.email,
        password: userID.password,
      }),
    };
    console.log(options);
    //on récupère le chemin de l'API
    let response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/dev-factory/register`,
      options
    );
    let data = response.json();
    console.log("data", data);
  };

  return (
    <div>
      <h1>Renseignez vos informations personnelles</h1>
      <form value={userID} onSubmit={handleSubmit} name="userInfo">
        <input
          type="text"
          onChange={handleInput}
          name="firstname"
          placeholder="Prénom"
          value={userID.firstname}
        />
        <input
          type="text"
          onChange={handleInput}
          value={userID.lastname}
          name="lastname"
          placeholder="Nom de famille"
        />
        <input
          type="email"
          onChange={handleInput}
          value={userID.email}
          name="email"
          placeholder="Votre mail"
        />
        <input
          type="password"
          onChange={handleInput}
          name="password"
          value={userID.password}
          placeholder="Votre mot de passe"
        />
        <input type="submit" value={"Créer un compte"} />
      </form>
    </div>
  );
}

export default CreateAccount;
