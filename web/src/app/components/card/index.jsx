import React from "react";
import { Card as MaterialCard, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

export function Card({
  title = "Título do módulo",
  href = "#",
  description,
  icons,
  additionalLabel,
}) {
  return (
    <div className="card-wrapper">

      <MaterialCard className="card-container">
        <label className='only-label'><strong>{additionalLabel}</strong></label>
        <Link to={href}>
          <section className="card-title">
            <h3 >{title}</h3>
            {icons}
          </section>
          <p className="card-description">{description}</p>
        </Link>

      </MaterialCard>
    </div>
  );
}
