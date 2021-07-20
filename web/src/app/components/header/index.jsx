import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Logo from "@Icons/logo.png";
import { useSession } from "@Context";

import "./style.scss";
import { routes } from "../../routes";

function getRole(value) {
  const textByRole = {
    PERSON: "Pessoa",
    COMPANY: "Empresa",
  };

  return textByRole[value];
}

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useSession();
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };
  return (
    <header id="header-component">
      <Link to={routes.HOME_PAGE} className="logo-name">
        <img className="logo" src={Logo} alt="Qualitá Compliance Logo" />
        {
          <div>
            <h1 className="title">Qualitá Compliance</h1>
            <h2 className="sub-title">Gestão de Excelência</h2>
          </div>
        }
      </Link>
      <Link to="files/visitsCard.pdf" target="_blank" className="visits-card">Entre em contato</Link>
      {user && (
        <section className="user-menu">
          <img
            className="avatar-img"
            width="50"
            alt="Imagem que representa a silhueta de uma pessoa"
            src="https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-silhueta-de-avatar-masculino-casual-by-vexels.png"
          />
          <div>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-role">{getRole(user.role)}</p>
          </div>
          <IconButton className="user-menu-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faChevronDown} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Sair </MenuItem>
            {user?.role === 'ADMIN' ? <MenuItem onClick={() => { }}>Painel de controle </MenuItem> : null}
          </Menu>
        </section>
      )}
    </header>
  );
}
