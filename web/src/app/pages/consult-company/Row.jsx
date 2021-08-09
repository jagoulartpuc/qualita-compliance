import React from 'react';
import { deleteCompany, readCompany } from '../../../services';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";

const Row = React.memo(
    ({ company, setCompanies, companies }) => {
        const history = useHistory();

        async function deletepls() {
            if (window.confirm(`Deseja mesmo excluir o usuário: ${company.cnpj}?`)) {
                await deleteCompany(Number(company.cnpj)).then(async () => {
                    await readCompany().then(data => setCompanies(data.data))
                })
            }
        }

        async function edit() {
            history.replace('cadastrar-empresas/' + company.cnpj);

        }

        return (
            <div className='row-container'>
                <div className='row'>
                    <div className='left'>
                        {company.cnpj}
                    </div>
                    <div className='right'>
                        {company.name}
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
