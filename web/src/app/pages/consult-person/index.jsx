import React, { useEffect, useState } from 'react';
import "./style.scss";
import CustomTable from "./Table";
import {readPerson} from '../../../services/index'
import {useHistory} from "react-router-dom";

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

  const childProps = { people, setPeople }
  return loading ? <h1>Carregando...</h1> : (
    <div id="consult-person-page">
      <main className="content">
        <h3 className="title">Consultar Pessoas</h3>
        <section className="form-section">
          <div className='directory'>
            {console.log(people.length === 0)}
            {!!people &&
              people.length > 0 &&
              (
                <CustomTable {...childProps} />
              )
            }
            {/*no person found*/}
            {(!people) ||
              (people.length === 0 && (
                <div className='no-data-found'>NENHUM REGISTRO ENCONTRADO </div>
              ))}
          </div>
        </section>
      </main>
    </div >
  );
}
