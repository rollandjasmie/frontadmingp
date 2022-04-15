import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Information from './Info2'
import './Devis.css'
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#001d3d',
    color: theme.palette.common.white,
    borderLeft: '1px solid #555 '
  },
  body: {
    fontSize: 14,
    borderLeft: '1px solid #555 '

  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData1(designation, pu, qte) {
  const total = pu * qte
  return { designation, pu, qte, total };
}
function creatlieu(dap, ret){
  return{ dap, ret}
}
function createpaiment(date, accompte, statu){
  return{ date, accompte, statu}
}
function createData2(depart, retour) {

  let date11 = new Date(depart);
  let date22 = new Date(retour);
  let timeDiff = Math.abs(date22.getTime() - date11.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return { depart, retour, diffDays };
}
//   c'est ici que les donner rentre


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CorrectDevis (props) {
  const [reservation, setReservation] = useState()

  useEffect(async () => {
    
    await axios.get(`/reservations/${props.match.params.id}`).then(response => {
      
      setReservation(response.data)
    });
  }, []);
  const rows = [
    createData1(reservation ? reservation.cat.name : null , reservation ? reservation.reservation.prix : null, 1)
  ];
  const rowslieu = [
    creatlieu(reservation ? reservation.reservation.lieu_depart : null, reservation ? reservation.reservation.lieu_retour : null)
  ]
  const rows1 = [
    createData2(reservation ? reservation.reservation.date_depart: null,reservation ? reservation.reservation.date_retour:null)
  ]
  const rowspaiment = [
    createpaiment(reservation ? reservation.reservation.created_at: null,reservation ? reservation.reservation.acompte :null,reservation ? reservation.reservation.status :null)
  ]

  const classes = useStyles();
  
  return (
    <div>
      <fieldset className='container-devi text-light rounded'>
        <legend className='d-flex align-items-center justify-content-center head--perso text-center w-50 rounded'>Information sur la Reservation</legend>

        <div className='d-flex justify-content-center mb-5 mt-5'>
          <img
            className='w-50 h-auto image--perso' src={"http://fd0b515.online-server.cloud" + (reservation ? reservation.voiture.image.url : null)} alt='voiture'
          />
        </div>

        <div className='mb-5'>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Designation </StyledTableCell>
                  <StyledTableCell align="center">prix unitaire </StyledTableCell>
                  <StyledTableCell align="center">Quantiter</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow >

                    <StyledTableCell >{row.designation}</StyledTableCell>
                    <StyledTableCell align="center">{row.pu}</StyledTableCell>
                    <StyledTableCell align="center">{row.qte}</StyledTableCell>
                    <StyledTableCell align="center">{row.total}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className='mb-5'>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Depart </StyledTableCell>
                  <StyledTableCell align="center">Retour </StyledTableCell>
                  <StyledTableCell align="center">Nombre de jour</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows1.map((row) => (
                  <StyledTableRow >
                    <StyledTableCell >{moment(row.depart).format('LLLL')}</StyledTableCell>
                    <StyledTableCell align="center">{moment(row.retour).format('LLLL')}</StyledTableCell>
                    <StyledTableCell align="center">{row.diffDays}</StyledTableCell>
                  </StyledTableRow>
                ))}
                {rowslieu.map((row) => (
                  <StyledTableRow >
                    <StyledTableCell >{row.dap}</StyledTableCell>
                    <StyledTableCell align="center">{row.ret}</StyledTableCell>
                    <StyledTableCell align="center">{}</StyledTableCell>
                  </StyledTableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className='mb-5'>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date de payement </StyledTableCell>
                  <StyledTableCell align="center">Acompte </StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rowspaiment.map((row) => (
                  <StyledTableRow >
                    <StyledTableCell >{moment(row.date).format('LLLL')}</StyledTableCell>
                    <StyledTableCell align="center">{row.accompte}</StyledTableCell>
                    <StyledTableCell align="center">{row.statu}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </fieldset>
      
      {reservation ? <Information client={reservation}/> : null}

    </div>
  )
}
