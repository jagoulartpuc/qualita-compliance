import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import {deletePerson, readPerson} from "../../../services";
import { Toast } from "@Components";
import { useHistory } from "react-router-dom";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name', numeric: false, sort: true, disablePadding: false, label: 'Nome' },
    { id: 'cpf',  numeric: false, sort: true, disablePadding: false, label: 'CPF/CNPJ' },
    { id: 'birthday',  numeric: false, sort: true, disablePadding: false, label: 'Data de Nascimento' },
    { id: 'email',  numeric: false, sort: true, disablePadding: false, label: 'E-mail' },
    { id: 'occupation',  numeric: false, sort: true, disablePadding: false, label: 'Cargo' },
    { id: 'phone',  numeric: false, sort: true, disablePadding: false, label: 'Telefone' },
    { id: 'profession',  numeric: false, sort: true, disablePadding: false, label: 'Profissão' },
    { id: 'schooling',  numeric: false, sort: true, disablePadding: false, label: 'Escolaridade' },
    { id: 'edit', numeric: false, sort: false, disablePadding: false, label: 'Editar' },
    { id: 'delete', numeric: false, sort: false, disablePadding: false, label: 'Deletar' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.sort ? (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                                    ) : null}
                                </TableSortLabel>
                            ) : headCell.label
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    button: {
        backgroundColor: 'transparent'
    }
}));

export default function CustomTable(props) {
    const classes = useStyles();
    const history = useHistory();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { people, setPeople } = props;

    const deleteP = async function(person) {
        if (window.confirm(`Deseja mesmo excluir o funcionário: ${person.cpf}?`)) {
            try {
                await deletePerson(Number(person.cpf));
                Toast({icon: 'success', title: "Funcionário deletada com sucesso!", didClose: () => readPerson().then(data => setPeople(data.data))});
            } catch (err) {
                Toast({icon: 'error', title: err, didClose: () => ""});
            }
        }
    }

    const  edit = async function(person) {
        history.replace('cadastrar-pessoas/' + person.cpf);

    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="small"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={people.length}
                        />
                        <TableBody>
                            {stableSort(people, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.cpf}
                                        >
                                            <TableCell id={labelId} scope="row" padding="normal">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.cpf}</TableCell>
                                            <TableCell>{row.birthday}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.occupation}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.profession}</TableCell>
                                            <TableCell>{row.schooling}</TableCell>
                                            <TableCell width="10%">
                                              <button type='button' className={classes.button} onClick={() => edit(row)}>
                                                  <EditIcon />
                                              </button>
                                            </TableCell>
                                            <TableCell width="10%">
                                                <button type='button' className={classes.button} onClick={() => deleteP(row)}>
                                                    <DeleteIcon />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={people.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
