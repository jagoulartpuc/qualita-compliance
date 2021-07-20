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
  inputActionValue,
  action,
  additionalLabel,
  checked
}) {
  return (
    <div className="card-wrapper">
      <MaterialCard className="card-container">
        {action ? (
          <div className='card-action'>
            <input id={inputActionValue}  type='checkbox' onChange={action} value={inputActionValue} checked={checked} />
            <label for={inputActionValue}><strong>{additionalLabel}</strong></label>
          </div>
        ) : <label  className='only-label'><strong>{additionalLabel}</strong></label>}
        <Link to={href}>
          <section className="card-title">
            <h3 >{title}</h3>
            {icon && <FontAwesomeIcon className="card-icon" icon={icon} size="2x" />}
          </section>
        </Link>

        <p className="card-description">{description}</p>
      </MaterialCard>
    </div>
  );
}
