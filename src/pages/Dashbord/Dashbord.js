import React, { useEffect, useState } from 'react'
import './Dashdord.css';
import axios from 'axios'
import ChiffreAffaire from './ChiffreAffaire';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const selectStyle = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function format(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + "h" + " " + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + "m" + " " + (secs < 10 ? "0" : "");
  ret += "" + secs + "s";
  return ret;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const Onglet = (props) => {
  return (
    <div className='col-md-2 mb-4 '>
      <div className="onglet row  ">
        <div className='col-12 d-flex justify-content-center align-items-center onglet_title'>{props.nom}</div>
        <div className='col-12 d-flex justify-content-center align-items-center onglet_chifre'>{props.chiffre}</div>
        <div className='col-12 d-flex justify-content-center align-items-center onglet_monte text-success'><i class="fa fa-long-arrow-up" aria-hidden="true"></i> &nbsp; {props.evolution}</div>
      </div>
    </div>
  )

}


export default function Dashbord() {

  const selects = selectStyle();
  const classes = useStyles();
  const now = 60;
  const [data, setData] = useState()
  const [state, setState] = useState({
    name: '7daysAgo'
  });

  const handleChange = (event) => {
    setData(null)
    let objet = { name: event.target.value }
    setState({
      name: event.target.value
    });
    axios.post('/analitique', objet).then(response => {
      setData(response.data)
    })
  };

  useEffect(() => {
    axios.post('/analitique', state).then(response => {
      setData(response.data)
    })

    data ? console.log(data.data) : console.log('not yet');
  }, [])

  return (
    <div>
      <ChiffreAffaire />
      <div className='row onglet pr-5 mt-5  d-flex align-items-center'> <Button href="/devis" className="m-2 ml-auto" variant="outlined" color="secondary">
        Crée un contrat de location
      </Button></div>
      <div className='row mt-10  d-flex justify-content-center align-items-center'><h1 className='ganal'>Présentation de google analytique</h1> </div>
      <div className='row mb-10  d-flex justify-content-center align-items-center'>

        <FormControl className={selects.formControl}>
          <NativeSelect

            value={state.name}
            name="name"
            onChange={handleChange}
            
          >
            <option value={'7daysAgo'}>Les 7 derniers jours </option>
            <option value={'today'}>Aujourd'hui</option>
            <option value={'Yesterday'}>Hier </option>

            <option value={'9daysAgo'}>Les 9 derniers jours </option>
            <option value={'30daysAgo'}>Les 30 derniers jours </option>
          </NativeSelect>
          <FormHelperText className='text-white'>Choisir les jours</FormHelperText>
        </FormControl>

      </div>
      {data ?
        <>

          <div className='row'>
            <Onglet nom='session' chiffre={data.data[4].value} evolution={parseInt(data.data[1].value) + '%'} />
            <Onglet nom='page visiter' chiffre={data.data[6].value} evolution='10%' />
            <Onglet nom='utilisateur' chiffre={data.data[3].value} evolution={parseInt(data.data[1].value) + '%'} />
            <Onglet nom='duree moyen' chiffre={format(parseInt(data.data[8].value))} evolution='60%' />
            <Onglet nom='visiteur' chiffre={data.data[4].value} evolution={parseInt(data.data[9].value) + '%'} />
            <Onglet nom='taux de rebond' chiffre={parseInt(data.data[5].value) + '%'} evolution='--' />
          </div>
        </>
        : <div className='row m-5  d-flex justify-content-center align-items-center'>    <CircularProgress /> </div>
      }



      <div className="row container circle_diagram">
        <div className=" col-md-6" role="main">
        </div>


      </div>

    </div>
  )
}











