import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';

export function ControlPanel() {

  return (
    <div id="report-page">
      <main className="content">
        <h3 className="title">Painel de Controle</h3>
        <section className="form-section">
          <div>
            <Link to='/consultar-pessoas'>
              Consultar Pessoas
            </Link>
            <Link to='/consultar-empresas'>
              Consultar Empresas
            </Link></div>
          <div>
            <Link to='/cadastrar-pessoas'>
              Cadastrar Pessoas
            </Link>
            <Link to='/cadastrar-empresas'>
              Cadastrar Empresas
            </Link></div>
        </section>
      </main>
    </div >
  );
}
