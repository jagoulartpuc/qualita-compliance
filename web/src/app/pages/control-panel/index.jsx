import React  from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export function ControlPanel() {
  return (
    <div id="control-panel-page">
      <main className="content">
        <h3 className="title">Painel de Controle</h3>
        <section className="form-section">
          <div className="links">
            <Link to='/consultar-pessoas' className="module-button">
              Consultar Pessoas
            </Link>
            <Link to='/consultar-empresas' className="module-button">
              Consultar Empresas
            </Link></div>
          <div className="links">
            <Link to='/cadastrar-pessoas' className="module-button">
              Cadastrar Pessoas
            </Link>
            <Link to='/cadastrar-empresas' className="module-button">
              Cadastrar Empresas
            </Link>
          </div>
        </section>
      </main>
    </div >
  );
}
