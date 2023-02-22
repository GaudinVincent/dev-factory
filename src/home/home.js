import React from "react";
import React, { useState } from 'react';

const Menu = () => {
  const [Open, setOpen] = useState(false);

  const Menu = () => {
    setOpen(!Open);
  };

  return (
    <nav>
      <button onClick={Menu}>Menu</button>
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

export default Menu;