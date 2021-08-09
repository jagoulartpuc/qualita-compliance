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
import {deleteCompany, readCompany} from "../../../services";
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
    { id: 'cnpj',  numeric: false, sort: true, disablePadding: false, label: 'CNPJ' },
    { id: 'adress',  numeric: false, sort: true, disablePadding: false, label: 'Endereço' },
    { id: 'email',  numeric: false, sort: true, disablePadding: false, label: 'E-mail' },
    { id: 'phones',  numeric: false, sort: true, disablePadding: false, label: 'Telefones' },
    { id: 'owner',  numeric: false, sort: true, disablePadding: false, label: 'Proprietário' },
    { id: 'business',  numeric: false, sort: true, disablePadding: false, label: 'Área' },
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
    const { companies, setCompanies } = props;

    const deleteP = async function(company) {
        if (window.confirm(`Deseja mesmo excluir a empresa: ${company.cnpj}?`)) {
            try {
                await deleteCompany(Number(company.cnpj));
                Toast({icon: 'success', title: "Empresa deletada com sucesso!", didClose: () => readCompany().then(data => setCompanies(data.data))});
            } catch (err) {
                Toast({icon: 'error', title: err, didClose: () => ""});
            }
        }
    }
    const  edit = async function(company) {
        history.replace('cadastrar-empresas/' + company.cnpj);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, companies.length - page * rowsPerPage);

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
                            rowCount={companies.length}
                        />
                        <TableBody>
                            {stableSort(companies, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.cnpj}
                                        >
                                            <TableCell id={labelId} scope="row" padding="normal">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.cnpj}</TableCell>
                                            <TableCell>{row.adress}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.phones.toString()}</TableCell>
                                            <TableCell>{row.owner}</TableCell>
                                            <TableCell>{row.business}</TableCell>
                                            <TableCell width="10%">
                                              <button type='button'
                                                      className={classes.button}
                                                      title="Editar"
                                                      onClick={() => edit(row)}>
                                                  <EditIcon />
                                              </button>
                                            </TableCell>
                                            <TableCell width="10%">
                                                <button type='button'
                                                        className={classes.button}
                                                        title="Deletar"
                                                        onClick={() => deleteP(row)}>
                                                    <DeleteIcon />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={companies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
