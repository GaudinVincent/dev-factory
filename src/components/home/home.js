import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  //on crée un objet à vide
  const [userLog, setUserLog] = useState({});
  const navigate = useNavigate();
  const [userOnline, setUserOnline] = useState(false);
  //on crée une condition pour vérifier si l'utilisateur est authentifié
  if (userOnline == true) {
    //si l'utilisateur est en ligne, on le redirige vers sa page personnelle
    navigate("/pageperso");
  }
  //on ajoute un événement sur les inputs
  const handleLogin = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value });
  };
  //à la validation du formulaire
  const userAuthent = async (e) => {
    e.preventDefault();
    //on spécifie les options de notre requête
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      //on dit au body de récupérer le contenu des inputs stockés dans la variable
      body: JSON.stringify({
        email: userLog.userMail,
        password: userLog.userPassword,
      }),
    };
    //on envoie la demande à la "route" correspondante

    await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/dev-factory/login`,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
        if (response.success == true) {
          //on sauvegarde le token dans le local storage
          localStorage.setItem("@userToken", response.token);
          setUserOnline(true);
          alert("Vous êtes en ligne");
          //on redirige vers la page personnelle
          navigate("/pageperso");
        } else {
          //sinon on affiche un message d'erreur
          return alert(response.message);
        }
      });
  };
  //on console.log userLog, chaque fois que userLog change
  useEffect(() => {
    console.log("userLog", userLog);
  }, [userLog]);
  return (
    <div className="home">
      <h1>DEV FACTORY</h1>
      <form value={userLog}>
        <input
          type="email"
          name="userMail"
          onChange={handleLogin}
          placeholder="Entrez votre email"
          required
        />
        <input
          type="password"
          name="userPassword"
          onChange={handleLogin}
          placeholder="Saisir mot de passe"
          required
        />
      </form>
      <div>
        <button onClick={userAuthent}>Connexion</button>
        <button>
          <Link to={"/createAccount"}>Créer un compte</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
