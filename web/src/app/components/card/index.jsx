import React from "react";
import { Card as MaterialCard, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

export function Card({
  title = "Título do módulo",
  href = "#",
  description,
  icon,
}) {
  return (
    <Link className="card-wrapper" to={href}>
      <MaterialCard className="card-container">
        <section className="card-title">
          <h3 >{title}</h3>
          {icon && <FontAwesomeIcon className="card-icon" icon={icon} size="2x" />}
        </section>
        <p className="card-description">{description}</p>
      </MaterialCard>
    </Link>
  );
}
