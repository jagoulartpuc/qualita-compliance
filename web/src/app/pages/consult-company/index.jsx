import React, { useEffect, useState } from 'react';
import "./style.scss";
import { readCompany } from '../../../services/index'
import CustomTable from "./Table";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function ConsultCompany() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect( () => {
    (async () => {
      try {
        setLoading(true);
        const {data: companiesResponse} = await readCompany();
        setCompanies(companiesResponse);
        setLoading(false);
      } catch (error) {
        history.replace("/");
      }
    })();
  }, []);

  const goBack = () => {
    history.goBack();
  }

  const childProps = { companies, setCompanies }
  return loading ? <h1>Carregando...</h1> : (
    <div id="consult-company-page">
      <main className="content">
        <h3 className="title">Consultar Empresas</h3>
        <div className='goback'>
          <a onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Voltar</span>
          </a>
        </div>
        <section className="form-section">
          <div className='directory'>
            {!!companies &&
              companies.length > 0 &&
              (
                <CustomTable {...childProps} />
              )
            }
            {(!companies) ||
              (companies.length === 0 && (
                <div className='no-data-found'>NENHUM REGISTRO ENCONTRADO</div>
              ))}
          </div>
        </section>
      </main>
    </div >
  );
}
