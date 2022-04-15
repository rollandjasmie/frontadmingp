import React, { useState, useEffect } from 'react'
import { TiDeleteOutline } from 'react-icons/ti';
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import { set, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios'
import './Devis.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        color: 'white',
        position: 'relative',
        borderBottom: '1px solid #ced4da',
        fontSize: 16,
        transition: theme.transitions.create(['box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),

    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const schema = yup.object().shape({
    email: yup.string().email("Veuillez saisir une adresse e-mail valide").required('Champ obligatoire'),
    forfait: yup.string().required('Champ obligatoire'),
    validation: yup.string().required('Champ obligatoire'),
    accompte: yup.string().required('Champ obligatoire'),
    prenom: yup.string().required('Champ obligatoire'),
    nom: yup.string().required('Champ obligatoire'),
    telephone: yup.string().required('Champ obligatoire')
})

export default function Info(props) {
    const classes = useStyles();
    const [forfaitPerso, setforfaitperso] = useState(null);
    const [client, setClient] = useState()
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [affiche, setAffiche] = useState(false)
    const [existclient, setExistclient] = useState(null)
    const [idclient_back, setidclientback] = useState(null)
    const [info_devis, setinfodevi] = useState(false)

    useEffect(() => {
        axios.get('/clients').then(res => {
            // setClient(res.data)
            if (res.status === 200) {
                
                setClient(res.data)
            }
        });
        
        const results = client ? client.filter(person =>
            person.nom.toLowerCase().search(searchTerm.toLowerCase()) !== -1
            // person.nom.toLowerCase().includes(searchTerm)
        ) : null;
        setSearchResults(results);
    }, [searchTerm]);

    const annuler_list = () => {
        setAffiche(false)
        setExistclient(null)
    }

    const change_valeur_entre = e => {
        setSearchTerm(e.target.value);
    };
    const change_forfait = (event) => {
        
        setforfaitperso(event.target.value);

    };
    const select_client_exist = (idC) => {
        setAffiche(false)
        setExistclient(idC)

    }


    const formik = useFormik({
        initialValues: {
            nom: '',
            telephone: '',
            email: '',
            prenom: '',
            forfait: '',
            accompte: '',
            status: '',
            vol: '',
            validation: ''
        },

        validationSchema: schema,

        onSubmit: async (values, { resetForm }) => {
            if (props.valide === true) {
                let date_devis = props.reservation.datedevis
                let id_voiture = props.reservation.voiture
                let signe = props.reservation.signe
            

                const clientId = async () => {
                    if (existclient) {
                        return existclient.id
                    } else {
                        let value = {}
                        let varId = ''

                        value['nom'] = values.nom
                        value['prenom'] = values.prenom
                        value['telephone'] = values.telephone
                        value['email'] = values.email

                        await axios.post('/info', value).then(reponse => {
                            if (reponse.status === 200) {
                               

                            }
                            varId = reponse.data.id.id
                        })

                        return varId
                    }

                }

                let value_back = {
                    date_depart: date_devis.dateDepart,
                    date_retour: date_devis.dateRetour,
                    heure_depart: date_devis.timeDepart,
                    heure_retour: date_devis.timeRetour,
                    lieu_depart: date_devis.lieuDepart,
                    lieu_retour: date_devis.lieuRetour,
                    voiture_id: id_voiture,
                    prix: values.forfait,
                    client_id: await clientId(),
                    numero_vol: values.vol,
                    acompte: values.accompte,
                    signe: signe,
                    status: values.statu,
                    valide: values.validation

                }
                
                await axios.post('/reservations', value_back).then(result => {
                    if (result.status === 201) {
                        
                        setinfodevi(result.data.id)
                    }
                })

            }

            setExistclient(null)
            resetForm()


        }
    })

    if (existclient) {
        formik.values.nom = existclient.nom
        formik.values.prenom = existclient.prenom
        formik.values.telephone = existclient.telephone
        formik.values.email = existclient.email
    }

    return (
        <div>
            {forfaitPerso && props.prix ?
                <div className='container-devi d-flex align-items-center'>
                    <p className=' p-2 border--perso text-center  h5'>Prix original:</p>
                    <div className='bg-red w-25 p-2 border--perso text-center text-white mr-5 h4'><strike>{props.prix}</strike> €</div>
                    <p className=' p-2 text-center h5'>Forfait:</p>
                    <div className='bg-warning w-25 border--perso p-2 mr-0 text-center text-dark h4'>{forfaitPerso} €</div>


                </div> : null}
            <form onSubmit={formik.handleSubmit}>
                <div className='row d-flex justify-content-center'>

                    {affiche === true ? (
                        <div className='resultDevis container-devi p-3 col-4'>
                            <div>
                                <TiDeleteOutline className='quitter h3 mb-0' onClick={annuler_list} />
                                <p className='text-center h3'>Suggestion client</p>
                            </div>

                            <ul className="text-center text-white">

                                {searchResults && searchResults.map((name) => {
                                    return <li className="" onClick={() => select_client_exist(name)}><div className="mt-4">{name.nom} <br /> {name.email}</div></li>
                                })}
                            </ul>

                        </div>) :
                        <div className='container-devi p-5 col-4'>
                            <div className=' row'>
                                <div className='col-12 '> <h1 className="col-12 info--perso  text-center d-flex justify-content-center"> INFORMATION SUR LE CONTRAT</h1>
                                </div>
                            </div >

                            <div className=' row'>

                                <FormControl className={classes.formControl}>
                                    <InputLabel id="" className='place--perso'>Status</InputLabel>
                                    <NativeSelect
                                        id="demo-customized-select-native"
                                        onChange={formik.handleChange} value={formik.values.statu}
                                        input={<BootstrapInput name='statu' />}
                                    >
                                        <option aria-label="None" className='bg-dark' value="" />
                                        <option className='bg-dark' value='Paye'>Paye</option>
                                        <option className='bg-dark' value='Paiment partiel'>Paiment partiel</option>
                                        <option className='bg-dark' value='Devis'>Devis</option>
                                    </NativeSelect>
                                </FormControl>


                            </div>
                            <div className='row'>
                                <FormControl className={classes.formControl} onChange={change_forfait}>
                                    <InputLabel className='place--perso' htmlFor="">Forfait loc personaliser</InputLabel>
                                    <BootstrapInput onChange={formik.handleChange} value={formik.values.forfait} type="number" name="forfait" />
                                </FormControl>
                                {formik.errors.forfait && formik.touched.forfait && (
                                <p className='text-danger '>{formik.errors.forfait}</p>
                            )}

                            </div>
                            <div className='row'>
                                <FormControl className={classes.formControl}>
                                    <InputLabel className='place--perso' htmlFor="">Acompte</InputLabel>
                                    <BootstrapInput onChange={formik.handleChange} value={formik.values.accompte} type="number" name='accompte' />
                                </FormControl>
                                {formik.errors.accompte && formik.touched.accompte && (
                                <p className='text-danger '>{formik.errors.accompte}</p>
                            )}

                            </div>
                            <div className='row'>
                                <FormControl className={classes.formControl}>
                                    <InputLabel className='place--perso' htmlFor="">Num de vol info supp  </InputLabel>
                                    <BootstrapInput id="" onChange={formik.handleChange} value={formik.values.vol} name="vol" />
                                </FormControl>
                                {formik.errors.vol && formik.touched.vol && (
                                <p className='text-danger '>{formik.errors.vol}</p>
                            )}
                            </div>
                            <div className='row'>
                                <FormControl className={classes.formControl}>
                                    <InputLabel className='place--perso' htmlFor="">Validation</InputLabel>
                                    <BootstrapInput onChange={formik.handleChange} value={formik.values.validation} type="number" name='validation' />
                                </FormControl>
                                {formik.errors.validation && formik.touched.validation && (
                                <p className='text-danger '>{formik.errors.validation}</p>
                            )}

                            </div>

                        </div>

                    }


                    <div className='container-devi p-5 col-4  '>
                        <div className=' row mb-5'>
                            <div className='col-12 '> <h1 className="col-12 info--perso text-center d-flex justify-content-center"> INFORMATION SUR LE CLIENT</h1>
                            </div>
                        </div >

                        <div className='row'>

                            <FormControl className={classes.formControl} onChange={change_valeur_entre} onFocus={() => setAffiche(true)}>
                                <InputLabel className='place--perso' htmlFor="">Nom</InputLabel>
                                <BootstrapInput id="" name="nom" onChange={formik.handleChange} value={formik.values.nom} />
                            </FormControl>
                            {formik.errors.nom && formik.touched.nom && (
                                <p className='text-danger '>{formik.errors.nom}</p>
                            )}

                        </div>

                        <div className='row'>
                            <FormControl className={classes.formControl}  >
                                <InputLabel className='place--perso' htmlFor="">Prenom</InputLabel>
                                <BootstrapInput id="" name="prenom" onChange={formik.handleChange} value={formik.values.prenom} />
                            </FormControl>
                            {formik.errors.prenom && formik.touched.prenom && (
                                <p className='text-danger '>{formik.errors.prenom}</p>
                            )}

                        </div>
                        <div className='row'>
                            <FormControl className={classes.formControl}>
                                <InputLabel className='place--perso' htmlFor="">Telephone  </InputLabel>
                                <BootstrapInput name="telephone" onChange={formik.handleChange} value={formik.values.telephone} />
                            </FormControl>
                            {formik.errors.telephone && formik.touched.telephone && (
                                <p className='text-danger '>{formik.errors.telephone}</p>
                            )}

                        </div>
                        <div className='row'>
                            <FormControl className={classes.formControl}>
                                <InputLabel className='place--perso' htmlFor="">Email</InputLabel>
                                <BootstrapInput id="" name="email" onChange={formik.handleChange} value={formik.values.email} />
                            </FormControl>
                            {formik.errors.email && formik.touched.email && (
                                <p className='text-danger '>{formik.errors.email}</p>
                            )}

                        </div>

                    </div>

                </div>


                <div className='mb-5 row d-flex justify-content-center'>
                    <FormControl className={classes.formControl}>
                        <Button className=' mr-auto button--perso' variant="contained" type='submit' color="primary">
                            Crees le contrat
                            </Button>
                    </FormControl>
                </div>
            </form>
            {info_devis ? <Redirect to={{ pathname: `/devis/${info_devis}` }} /> : null}


        </div>

    )

}
