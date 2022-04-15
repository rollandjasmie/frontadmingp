import React, { useState } from 'react'
import './Devis.css'
import moment from 'moment';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
// import { date } from 'yup';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

    formControl: {

        background: '#26b99a;',
        margin: theme.spacing(1),
        minWidth: 120,
        borderRadius: 5,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Contain(props) {
    return (
        <div className='text-secondary mt-3 mb-3'>
            <div className='row '>
                <div className='col-6 d-flex align-items-center justify-content-center  '>
                    <strong> {props.option} </strong>
                </div>

                <div className='col-6 d-flex align-items-center justify-content-center border--perso2'>
                    {props.value}
                </div>
            </div>
            <hr />
        </div>
    )
}


export default function Info2(props) {
    const { id } = useParams();
    const classes = useStyles();
    const [date_envoyer, setdatenvoyer] = useState(null)
    const [client, setClient] = useState(props.client.client)
    const [res, setres] = useState(props.client.reservation)
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });
    const cond = (res.status === 'Devis' || res.status === 'Devis/paiment partiel' || res.status === 'Devis/paiment total')

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const getdate = async () => {
        await axios.post(`/sendevis/${id}`).then(rep => {
            alert(rep.data.message)
        })
        window.location.reload()

    }

    const dataInfo = (option, info) => {
        return { option, info }
    }

    const ligne1 = [
        dataInfo('Prénom', client.prenom),
        dataInfo('Nom', client.nom),
        dataInfo('Téléphone', client.telephone),
        dataInfo('Email', client.email),
        dataInfo('Adresse sur place', ''),
        dataInfo('Adresse',),
        dataInfo('Adresse suite', ''),
        dataInfo('Ville', ''),
        dataInfo('Code postal', ''),
        dataInfo('Pays', ''),
    ]
    const ligne2 = [
        cond ? dataInfo('Valide Pendant', res.valide):dataInfo(null,null),
        dataInfo('Date de création', moment(res.created_at).format('LLL')),
        cond ? dataInfo('Date d’envoie du devis', res.envoi ? moment(res.envoi).format('LLL') : "Devis n'est pas envoyer"):dataInfo(null,null),
        cond ? dataInfo('Fin de validité', moment(res.created_at).add(res.valide, 'd').format('LLL')):dataInfo(null,null),
        dataInfo('Acompte', res.acompte),
        dataInfo('Total', res.prix),
    ]

   

    return (
        <div>
            <div className='row mb-5 d-flex align-items-center justify-content-center '>
                <div className='col-md-10 '>
                    <fieldset className=' container-devi2 text-light rounded bg-white mod--perso'>
                        <legend className='d-flex align-items-center justify-content-center head--perso pl-5 pr-5 text-center w-50 rounded titre--perso2'>Information sur le client</legend>
                        {ligne1.map(lign => (
                            <Contain option={lign.option} value={lign.info}></Contain>
                        )
                        )}


                    </fieldset>
                </div>
                {/* <div className='col-md-5 ' >
                <fieldset className=' container-devi2 text-light rounded bg-white mod--perso'>
                    <legend className='d-flex align-items-center justify-content-center head--perso pl-5 pr-5 text-center w-50 rounded titre--perso2'>Information sur le contrat </legend>
                    <Contain option='Nombre de personne' value='jules'></Contain>
                    <Contain option='Num permis' value='jules'></Contain>
                    <Contain option='Lieu permis' value='jules'></Contain>
                    <Contain option='Datepermis' value='jules'></Contain>
                    <Contain option='Date naissance' value='jules'></Contain>
                    <Contain option='Lieux de nissance' value='jules'></Contain>
                    <Contain option='Model de vehicule' value='jules'></Contain>
                    <Contain option='Immat' value='jules'></Contain>
                    <Contain option='Franchise' value='jules'></Contain>
                    <Contain option='caution' value='jules'></Contain>
                    <Contain option='Conducteur auditionnel' value='jules'></Contain>
                    <Contain option='Observation' value='jules'></Contain>
                </fieldset>
            </div> */}
            </div>


            <div className='row mb-5 d-flex align-items-center justify-content-center '>
                <div className=' col-12'>
                    <fieldset className=' container-devi text-light rounded'>
                        <legend className='d-flex align-items-center justify-content-center head--perso pl-5 pr-5 text-center w-50 rounded titre--perso2'>Information sur le contrat</legend>
                        <div className='row d-flex align-items-center'>
                            <div className='col-4'>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        native
                                        value={res.status}
                                        onChange={handleChange}
                                        label="Age"
                                    // inputProps={{
                                    //     name: 'age',
                                    //     id: 'outlined-age-native-simple',
                                    // }}
                                    >
                                        <option className='bg-dark' value='ddd' />
                                        <option className='' value='Paye'>Paye</option>
                                        <option className='' value='Paiment partiel'>Paiment Partiel</option>
                                        <option className='' value='Devis/paiment total'>Devis/paiment total</option>
                                        <option className='' value='Devis'>Devis</option>
                                    </Select>
                                </FormControl>

                            </div>

                            {cond ?
                            <div className='col-2 ml-auto '>
                            <p className=' text-success'> Exiprer dans {res.valide} jr </p>
                        </div>: null}

                        </div>

                        <div className='row d-flex align-items-center justify-content-center'>
                            <div className='col-5'>
                                {ligne2.map(lign => (
                                    <Contain option={lign.option} value={lign.info}></Contain>
                                )
                                )}
                            </div>
                        </div>


                        {
                            cond ?

                                <div className='row '>
                                    <div className='col-6 mr-auto '>

                                        {
                                            res.si_envoi === true ? null :
                                                <div className='col-6 mr-auto'>
                                                    <button className='btn btn-success' onClick={() => { getdate() }}>Envoyer par Email</button>
                                                </div>
                                        }

                                    </div>
                                    <div className='col-2 ml-auto'>
                                        <Link onClick={() => window.location.href = `/devis/${res.id}/visuel`} >
                                            <button className='btn btn-primary'>
                                                Visualiser
                                    </button>
                                        </Link>
                                    </div>

                                </div> : null}

                    </fieldset>
                </div>
            </div>
        </div>
    )
}
