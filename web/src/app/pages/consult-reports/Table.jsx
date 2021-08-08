import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
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
import FindInPageIcon from '@material-ui/icons/FindInPage';
import {deleteReport, getReports} from "../../../services/report.service";
import {useHistory} from "react-router-dom";
import "./style.scss";

function formatDates(dates) {
    return dates.reduce((acc, current) => {
        return [...acc, Intl.DateTimeFormat("pt-br").format(new Date(current))];
    }, []);
}

function listToStringDate(list) {
    if (list.length <= 1) {
        return '';
    }
    console.log(list)
    const lastItem = list.pop();
    return `${list.join(", ")} e ${lastItem}`;
}

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
    {id: 'trackingId', numeric: false, sort: true, disablePadding: false, label: 'Nº de protocolo'},
    {id: 'companyName', numeric: false, sort: true, disablePadding: false, label: 'Empresa'},
    {id: 'local', numeric: false, sort: true, disablePadding: false, label: 'Local'},
    {id: 'category', numeric: false, sort: false, disablePadding: false, label: 'Categoria'},
    {id: 'dates', numeric: false, sort: false, disablePadding: false, label: 'Datas'},
    {id: 'urgent', numeric: false, sort: false, disablePadding: false, label: 'Urgênte'},
    {id: 'isManagerKnowledge', numeric: false, sort: false, disablePadding: false, label: 'De conhecimento do gestor'},
    {id: 'status', numeric: false, sort: false, disablePadding: false, label: 'Status'}
];

function EnhancedTableHead(props) {
    const {classes, order, orderBy, onRequestSort} = props;
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
                <TableCell width="10%"></TableCell>
                <TableCell width="10%"></TableCell>
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
    const {reports, setReports} = props;

    const deleteP = async function (report) {
        if (window.confirm(`Deseja mesmo excluir a denúncia: ${report.trackingId}?`)) {
            await deleteReport(Number(report.trackingId)).then(async () => {
                await getReports().then(data => setReports(data.data))
            })
        }
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, reports.length - page * rowsPerPage);

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
                            rowCount={reports.length}
                        />
                        <TableBody>
                            {stableSort(reports, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.trackingId}
                                        >
                                            <TableCell id={labelId} scope="row" padding="normal">
                                                {row.trackingId}
                                            </TableCell>
                                            <TableCell>{row.companyName}</TableCell>
                                            <TableCell>{row.local}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{listToStringDate(formatDates(row.dates))}</TableCell>
                                            <TableCell>{row.urgent}</TableCell>
                                            <TableCell>{row.isManagerKnowledge}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell width="10%">
                                                <button type='button'
                                                        className={classes.button}
                                                        title="Visualizar"
                                                        onClick={() => history.push(`/denuncia-admin/${row.trackingId}`)}>
                                                    <FindInPageIcon />
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
                                <TableRow style={{height: 33 * emptyRows}}>
                                    <TableCell colSpan={10}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={reports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
