import { Button } from "@Components";
import React, { useEffect, useState } from 'react';
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import Row from './Row';
import { readCompany } from '../../../services/index'

export function ConsultCompany() {

  const [companies, setCompanies] = useState([])

  useEffect(async () => {
    await readCompany().then((data) => setCompanies(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const childProps = { companies, setCompanies }
  return (
    <div id="report-page">
      <main className="content">
        <h3 className="title">Consultar Empresas</h3>
        <section className="form-section">
          <div className='directory'>
            {!!companies &&
              companies.length > 0 &&
              companies.map((company) => {
                return <Row {...childProps} company={company} key={company.cnpj} />;
              })}
            {/*no person found*/}
            {(!companies) ||
              (companies.length === 0 && (
                <div className='no-file-found'>NENHUM REGISTRO ENCONTRADO </div>
              ))}
          </div>
        </section>
      </main>
    </div >
  );
}
