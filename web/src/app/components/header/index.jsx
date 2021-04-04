import React from "react";
import Logo from "@Icons/logo.png";

import "./style.scss";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export function Header() {
  return (
    <header id="header-component">
      <Link to={routes.HOME_PAGE} className="logo-name">
        <img className="logo" src={Logo} alt="Qualitá Compliance Logo" />
        {
          <div >
          <h1 className="title">
            Qualitá Compliance <br />
          </h1>

          <h2 className="sub-title">
              Gestão de Excelência <br />
          </h2>
          </div>
        }
      </Link>
    </header>
  );
}
