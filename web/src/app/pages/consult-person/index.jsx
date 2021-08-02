import { Button } from "@Components";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import Row from './Row';
import { readPerson } from '../../../services/index'

export function ConsultPerson() {

  const [people, setPeople] = useState([])

  useEffect(async () => {
    await readPerson().then((data) => setPeople(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const childProps = { people, setPeople }
  return (
    <div id="report-page">
      <main className="content">
        <h3 className="title">Consultar Pessoas</h3>
        <section className="form-section">
          <div className='directory'>
            {!!people &&
              people.length > 0 &&
              people.map((person) => {
                return <Row {...childProps} person={person} key={person.cpf} />;
              })}
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
