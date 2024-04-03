'use client'

import "./pico.min.css";
import "./custom.css";
import "./flexbox-utils.css";
import { useState } from "react";
import Communes from "./components/commune";
import Departement from "./components/departement";
import Region from "./components/region";
import Collectivite from "./components/collectivite";

export default function Home() {
  const [type, setType] = useState("communes");


  return (
    <>
      <nav>
        <ul>
          <li>
            <strong>Budgets</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" className="secondary" onClick={() => { setType("communes") }}>
              Communes
            </a>
          </li>
          <li>
            <a href="#" className="secondary" onClick={() => { setType("collectivites") }}>
              Collectivités
            </a>
          </li>
          <li>
            <a href="#" className="secondary" onClick={ () => { setType("departements" )} }>
              Départements
            </a>
          </li>
          <li>
            <a href="#" className="secondary" onClick={ () => { setType("regions" )} }>
              Régions
            </a>
          </li>
          
        </ul>
      </nav>
      <main>
      {type === "communes" && (
        <Communes />
      )}
      {type === "departements" && (
        <Departement />
      )}
      {type === "regions" && (
        <Region />
      )}
      {type === "collectivites" && (
        <Collectivite />
      )}
      </main>
    </>
  );
}
