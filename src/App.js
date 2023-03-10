import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./navigation/nav";
import React, { useState } from 'react';

const Menu = () => {
  const [Open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!Open);
  };

  return (
    <nav>
      <button onClick={toggleMenu}>Menu</button>
      {Open && (
        <ul>
          <li>Accueil</li>
          <li>À propos</li>
          <li>Contact</li>
        </ul>
      )}
    </nav>
  );
};



function App() {
  return <RouterProvider router={router} />;
}

export default App;
