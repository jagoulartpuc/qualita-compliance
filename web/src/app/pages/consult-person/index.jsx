import React, { useEffect, useState } from 'react';
import "./style.scss";
import CustomTable from "./Table";
import { readPerson } from '../../../services/index'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function ConsultPerson() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect( () => {
    (async () => {
      try {
        setLoading(true);
        const {data: peopleResponse} = await readPerson();
        setPeople(peopleResponse);
        setLoading(false);
      } catch (error) {
        history.replace("/");
      }
    })();
  }, []);

  const goBack = () => {
    history.goBack();
  }

  const childProps = { people, setPeople }
  return loading ? <h1>Carregando...</h1> : (
    <div id="consult-person-page">
      <main className="content">
        <h3 className="title">Consultar Pessoas</h3>
        <div className='goback'>
          <a onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Voltar</span>
          </a>
        </div>
        <section className="form-section">
          <div className='directory'>
            {!!people &&
              people.length > 0 &&
              (
                <CustomTable {...childProps} />
              )
            }
            {(!people) ||
              (people.length === 0 && (
                <div className='no-data-found'>NENHUM REGISTRO ENCONTRADO</div>
              ))}
          </div>
        </section>
      </main>
    </div >
  );
}
