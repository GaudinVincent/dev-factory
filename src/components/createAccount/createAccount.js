import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../assets/footer/footer";
import "./createAccount.css";

function CreateAccount() {
  //on crée une variable à vide contenant un objet
  const [userID, setUserID] = useState({});
  //on crée un événement sur les inputs pour stocker leur valeur dans l'objet userID
  const handleInput = (e) => {
    setUserID({ ...userID, [e.target.name]: e.target.value });
  };

  //à la validation du formulaire, on envoie les informations de chaque input dans l'objet
  const navigate = useNavigate();
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
    console.log("options", options);
    //on récupère le chemin de l'API
    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/dev-factory/register`,
      options
    )
      .then((response) => {
        return response.json();
      })
      //si la création de compte est réussie, on envoie une alerte et on se redirige vers pageperso
      .then((response) => {
        console.log("response", response);
        alert("Votre compte a bien été créé");
        navigate("/pageperso");
      });
  };

  return (
    <div>
      <span
        onClick={() => {
          navigate("/");
        }}
        id="backToLogin"
      >
        <i className="fa-solid fa-arrow-left"></i> Retour à l'accueil
      </span>
      <div className="createProfile">
        {" "}
        <h1>Créez votre compte</h1>
        <div id="formContent">
          <input
            type="text"
            onChange={handleInput}
            name="firstname"
            placeholder="Prénom"
            required
          />
          <input
            type="text"
            onChange={handleInput}
            name="lastname"
            placeholder="Nom de famille"
            required
          />
          <input
            type="email"
            onChange={handleInput}
            name="email"
            placeholder="Votre mail"
            required
          />
          <input
            type="password"
            onChange={handleInput}
            name="password"
            placeholder="Votre mot de passe"
            required
          />
          <button onClick={handleSubmit}>Valider</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
