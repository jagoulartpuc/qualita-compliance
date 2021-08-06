import React, { useEffect, useState } from 'react';
import "./style.scss";
import { readCompany } from '../../../services/index'
import CustomTable from "./Table";

export function ConsultCompany() {

  const [companies, setCompanies] = useState([])

  useEffect(async () => {
    await readCompany().then((data) => setCompanies(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const childProps = { companies, setCompanies }
  return (
    <div id="consult-company-page">
      <main className="content">
        <h3 className="title">Consultar Empresas</h3>
        <section className="form-section">
          <div className='directory'>
            {!!companies &&
              companies.length > 0 &&
              (
                <CustomTable {...childProps} />
              )
            }
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
