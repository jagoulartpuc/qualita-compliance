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
  actionElement,
  additionalLabel,
}) {
  return (
    <div className="card-wrapper">
      <MaterialCard className="card-container">
        {actionElement ? (
          <div className='card-action'>
            {actionElement}
          </div>
        ) : <label  className='only-label'><strong>{additionalLabel}</strong></label>}
        <Link to={href}>
          <section className="card-title">
            <h3 >{title}</h3>
            {icon && <FontAwesomeIcon className="card-icon" icon={icon} size="2x" />}
          </section>
        <p className="card-description">{description}</p>

        </Link>

      </MaterialCard>
    </div>
  );
}
