/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { filter } from 'lodash';
import moment from 'moment';
// import { Link as useLocation } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
// import { makeStyles } from '@material-ui/styles';
import SearchNotFound from '../../components/SearchNotFound';
// import Scrollbar from '/../../components/Scrollbar';
import Scrollbar from '../../components/Scrollbar';

import Page from '../../components/Page';
import Label from '../../components/Label';
import { PersonnelListHead, PersonnelListToolbar } from '../../components/_dashboard/personnel';

const TABLE_HEAD = [
  { id: 'NE', label: 'Consulté(e) par', alignRight: false },
  { id: 'DN', label: 'Date', alignRight: false },
  { id: 'SE', label: 'PB(cm)', alignRight: false },
  { id: 'DC', label: 'PC(cm)', alignRight: false },
  { id: 'SxE', label: 'Poids(kg)', alignRight: false },
  { id: 'SxE', label: 'Taille(cm)', alignRight: false },
  { id: 'SxE', label: 'Malnutrition', alignRight: false }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] > a[orderBy]) {
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.user.nom_user.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function MoreDetails({ id }) {
  const classes = useStyles();
  // const location = useLocation();
  const myId = id;

  const [usersList, setUsersList] = useState([]);
  const [anthro, setAnthro] = useState([]);
  const [loader, setLoader] = useState(true);

  const getUsers = `https://kesho-congo-api.herokuapp.com/patient/detail?id_patient=${myId}`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  };

  useEffect(() => {
    fetch(getUsers, options)
      .then((response) => response.json())
      .then((data) => {
        setAnthro(data.Anthropometrique);
        setUsersList(data.consultants);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, []);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nom_user');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    // console.log(property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersList.map((n) => n.nom_user); // ici*******************
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const filteredUsers = applySortFilter(usersList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);

  return (
    <Page>
      <Container>
        <Card>
          <PersonnelListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            {loader ? (
              <div className={classes.root}>
                <LinearProgress />
              </div>
            ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <PersonnelListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={usersList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((consultant, i) => {
                        const { id_user, nom_user, prenom_user, transferer_unt } = consultant.user;

                        const isItemSelected = selected.indexOf(nom_user) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id_user}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, nom_user)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar
                                  alt={nom_user}
                                  src={`/static/mock-images/avatars/avatar_${id_user}.jpg`}
                                />
                                <Typography variant="subtitle2" noWrap>
                                  {`${nom_user} ${prenom_user}`}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              {moment(anthro[i].createdAt).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell> {anthro[i].peri_brachial}</TableCell>
                            <TableCell>{anthro[i].peri_cranien}</TableCell>
                            <TableCell>{anthro[i].poids}</TableCell>
                            <TableCell>{anthro[i].taille}</TableCell>
                            <TableCell align="center">
                              {transferer_unt ? (
                                <>
                                  <Badge color="error" variant="dot" />
                                  &nbsp;&nbsp;
                                </>
                              ) : (
                                ''
                              )}
                              <Label
                                variant="outlined"
                                sx={{
                                  color: `${
                                    anthro[i].type_malnutrition === 'MAC'
                                      ? '#D32F2F'
                                      : anthro[i].type_malnutrition === 'MAM'
                                      ? '#ffb74d'
                                      : anthro[i].type_malnutrition === 'MAS-K'
                                      ? '#e57373'
                                      : anthro[i].type_malnutrition === 'MAS-M'
                                      ? '#f57c00'
                                      : '#4CAF50'
                                  }`
                                }}
                              >
                                {anthro[i].type_malnutrition}
                              </Label>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={usersList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
