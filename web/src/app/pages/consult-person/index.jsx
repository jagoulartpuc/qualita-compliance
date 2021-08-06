import React, { useEffect, useState } from 'react';
import "./style.scss";
import CustomTable from "./Table";
import {readPerson} from '../../../services/index'

export function ConsultPerson() {

  const [people, setPeople] = useState([])

  useEffect(async () => {
    await readPerson().then((data) => setPeople(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const childProps = { people, setPeople }
  return (
    <div id="consult-person-page">
      <main className="content">
        <h3 className="title">Consultar Pessoas</h3>
        <section className="form-section">
          <div className='directory'>
            {!!people &&
              people.length > 0 &&
              (
                <CustomTable {...childProps} />
              )
            }
            {/*no person found*/}
            {(!people) ||
              (people.length === 0 && (
                <div className='no-file-found'>NENHUM REGISTRO ENCONTRADO </div>
              ))}
          </div>
        </section>
      </main>
    </div >
  );
}
