import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deletePerson, readPerson } from '../../../services/index';

import { useHistory } from "react-router-dom";

const Row = React.memo(
    ({ people, setPeople, person }) => {
        const history = useHistory();

        async function deletepls() {
            if (window.confirm(`Deseja mesmo excluir o usuário: ${person.cpf}?`)) {
                await deletePerson(Number(person.cpf)).then(async () => {
                    await readPerson().then(data => setPeople(data.data))
                })
            }
        }

        async function edit() {
            history.replace('cadastrar-pessoas/' + person.cpf);
        }

        return (
            <div className='row-container'>
                <div className='row'>
                    <div className='left'>
                        {person.cpf}
                    </div>
                    <div className='right'>
                        {person.name}
                    </div>
                </div>
                <div className='icons'>
                    <button type='button' onClick={() => edit()}>
                        <EditIcon />
                    </button>
                    <button type='button' onClick={() => deletepls()}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        );
    }
);

export default Row;
