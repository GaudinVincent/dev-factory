import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>DEV FACTORY</h1>
      <form action="" method="post">
        <input type="email" placeholder="Entrez votre email" />
        <input type="password" placeholder="Saisir mot de passe" />
        <button>Se connecter</button>
        <button>
          <Link to={"/createAccount"}>Créer un compte</Link>{" "}
        </button>
      </form>
    </div>
  );
}

export default Home;
