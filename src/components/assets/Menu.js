import * as React from "react";
import  { useState } from 'react';
import { Link } from "react-router-dom";
function Menu() {
  const [Open, setOpen] = useState(false);

  const Menuopen = () => {
    setOpen(!Open);
  };


  return <div>
  <nav>
  <button onClick={Menuopen}>Menu</button>
  {Open && (
    <ul>
      <Link to="/"><li>Accueil</li></Link>
      <Link to="/PagePerso" ><li>Nom Profil </li></Link>
      <li>Watch</li>
      <li>Market place</li>
      <li>Groupes</li>
      <li>Gaming</li>
    </ul>
  )}
</nav>
</div>;
};
export default Menu;
