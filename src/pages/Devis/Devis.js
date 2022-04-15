import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { parse, isDate } from "date-fns";
import axios from 'axios'
import { BsInfoSquareFill } from 'react-icons/bs';
import './Devis.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Info from './Info'
const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const devisSchema = Yup.object().shape({
    dateDepart: Yup.date()
        .required('vous devez indiquer votre date de départ')
        .transform(parseDateString).min(yesterday, "la date de depart doit être supérieur ou égale à aujourd'hui"),
    dateRetour: Yup.date()
        .default(null)
        .required('vous devez indiquer votre date de retour')
        .nullable()
        .when('dateDepart', (dateDepart, schema) => {
            return dateDepart && schema.min(dateDepart, 'la date retour doit être supérieur à la date depart')
        }),
    timeDepart: Yup.string()
        .required('information important'),
    timeRetour: Yup.string()
        .required('information important'),
    lieuDepart: Yup.string()
        .required('Ne peut pas etre vide'),
    lieuRetour: Yup.string()
        .required('Ne peut pas etre vide'),

})

function dateDiff(date1, date2) {
    let date11 = new Date(`${date1}`);
    let date22 = new Date(`${date2}`);
    let timeDiff = Math.abs(date22.getTime() - date11.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
}
function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}



export default function Devis() {

    const [limit, setLimit] = useState()
    const [datavoit, setDatavoit] = useState() //donne du voiture
    const [cat, setCat] = useState(0)
    const [checked1, setChecked1] = React.useState();
    const [checked2, setChecked2] = React.useState();
    const [data, setdata] = React.useState({ message: 'Veuillez charger les tarifs pour pouvoir valider le contrat ou la demande de devis', marque: 'aucun' })
    const [jour, setjour] = React.useState()
    const [prix, setprix] = useState()
    const [bebe, setbebe] = useState('0')
    const [rehausse, setrehausse] = useState('0')
    const [datedevis, setdatedevis] = useState()
    const [signe, setsigne] = useState()
    const [valide, setvalide] = useState(false)

    const checkChange1 = (event) => {
        setChecked1(event.target.checked);
    };

    const checkChange2 = (event) => {
        setChecked2(event.target.checked);
    };

    useEffect(() => {
        axios.post(
            '/devis').then(response => {
                setDatavoit(response.data.car[cat]);
                setLimit(response.data.nombre)
            });
    }, [cat]);

    const next = () => {
        cat > limit - 2 ? setCat(0) : setCat(cat + 1)
    }

    const prev = () => {
        cat < 1 ? setCat(limit - 1) : setCat(cat - 1)
    }

    const formik = useFormik({
        initialValues: {
            dateDepart: '',
            timeDepart: '',
            dateRetour: '',
            timeRetour: '',
            lieuRetour: 'Aéroport Roland-Garros',
            lieuDepart: 'Aéroport Roland-Garros',
        },
        validationSchema: devisSchema,

        onSubmit: async (values) => {
            setvalide(true)
            let date1 = values.dateDepart;
            let date2 = values.dateRetour;
            let data = JSON.stringify(values)
            const jourD = (dateDiff(date1, date2) + 1)

            await axios.get(`/devisvoitures/${data}/${datavoit.voiture.id}/${datavoit.categorie.id}/${jourD}`).then(reponse => {
                if (reponse.status === 200) {
                    
                    setdata(reponse.data)
                    setprix(reponse.data.prix)
                    setjour(jourD)
                    setdatedevis(values)
                    setsigne(reponse.data.signe)

                }

            });
        },
    })

    const siegebebe = (e) => {
        // console.log(e.target.value)

        let prixsiege = ''

        if (bebe === '1') {
            prixsiege = prix - 9
        } else if (bebe === '2') {
            prixsiege = prix - 18
        } else if (bebe === '3') {
            prixsiege = prix - 27
        } else {
            prixsiege = prix
        }


        if (e.target.value === '1') {
            prixsiege = prixsiege + 9
        } else if (e.target.value === '2') {
            prixsiege = prixsiege + 18
        } else if (e.target.value === '3') {
            prixsiege = prixsiege + 27
        } else {
            prixsiege = prixsiege
        }

        setprix(prixsiege)
        setbebe(e.target.value)

    }

    const rehausseur = (e) => {
        // console.log(e.target.value)

        let prixreh = ''

        if (rehausse === '1') {
            prixreh = prix - 9
        } else if (rehausse === '2') {
            prixreh = prix - 18
        } else if (rehausse === '3') {
            prixreh = prix - 27
        } else {
            prixreh = prix
        }


        if (e.target.value === '1') {
            prixreh = prixreh + 9
        } else if (e.target.value === '2') {
            prixreh = prixreh + 18
        } else if (e.target.value === '3') {
            prixreh = prixreh + 27
        } else {
            prixreh = prixreh
        }

        setprix(prixreh)
        setrehausse(e.target.value)

    }

    const covid = () => {

        if (checked1 === true) {
            setprix(prix - 10)
        } else {
            setprix(prix + 10)
        }

    }

    const gps = () => {

        if (checked2 === true) {
            setprix(prix - 27)
        } else {
            setprix(prix + 27)
        }

    }

    const reservation = {}
    reservation['datedevis'] = datedevis
    reservation['voiture'] = datavoit ? datavoit.voiture.id : null
    reservation['signe'] = signe


    return (
        <div>
            <div className='container-devi p-5'>
                <div className='row '> <h1 className="col-12 titre--perso  d-flex justify-content-center"> CREATION D'UN CONTRAT</h1> </div>
                <form id='my-form' onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className='col-md-4  d-flex align-items-center '>
                            <div className='row col-12 d-flex justify-content-center w-100 h-100 '>
                                <img className=' mt-2  image--perso' src={"http://fd0b515.online-server.cloud" + (datavoit ? datavoit.voiture.image.url : null)} alt='voiture' />
                            </div>
                            <br />
                        </div>
                        <div className='col-md-8 ml-auto container--form'>

                            <div className='mb-5'>
                                <div className='row'>
                                    <label className='col-4 ml-auto' htmlFor='dateDepart'>Date de depart</label>
                                    <label className='col-4 ml-auto' htmlFor='lieuDepart'>Lieu de depart</label>
                                    <label className='col-3 ml-auto' htmlFor='timeDepart'>Heure de depart</label>

                                </div>
                                <div className='row'>

                                    <input
                                        className='col-4 ml-auto input--perso'
                                        type="date"
                                        name="dateDepart"
                                        id="dateDepart"
                                        onChange={formik.handleChange}
                                        value={formik.values.dateDepart}
                                    />

                                    <select
                                        className='col-4 ml-auto input--perso'
                                        type="text"
                                        name="lieuDepart"
                                        id="lieuDepart"
                                        onChange={formik.handleChange}
                                        value={formik.values.lieuDepart}
                                    >
                                        <option value='Aéroport Roland-Garros'> Aéroport Roland-Garros </option>
                                        <option value='Sainte-Marie'> Sainte-Marie</option>
                                    </select>
                                    <input
                                        className='col-3 input--perso lera ml-auto'
                                        type="time"
                                        name="timeDepart"
                                        id="timeDepart"
                                        onChange={formik.handleChange}
                                        value={formik.values.timeDepart}
                                    />

                                </div>
                                <div className='row ml-auto text-center'>
                                    {formik.errors.dateDepart && formik.touched.dateDepart && (
                                        <p className='col-4 text-danger '>{formik.errors.dateDepart}</p>
                                    )}
                                    {formik.errors.lieuDepart && formik.touched.lieuDepart && (
                                        <p className='col-5 text-danger'>{formik.errors.lieuDepart}</p>
                                    )}
                                    {formik.errors.timeDepart && formik.touched.timeDepart && (
                                        <p className='col-3 position-relative ml-auto text-danger'>{formik.errors.timeDepart}</p>
                                    )}

                                </div>
                            </div>

                            <div>
                                <div className='row'>
                                    <label className='col-4 ml-auto' htmlFor='dateDepart'>Date de retour</label>
                                    <label className='col-4 ml-auto' htmlFor='lieuDepart'>Lieu de retour</label>
                                    <label className='col-3 ml-auto' htmlFor='timeDepart'>Heure de retour</label>

                                </div>
                                <div className='row'>
                                    <input
                                        className='col-4 ml-auto input--perso'
                                        type="date"
                                        name="dateRetour"
                                        id="dateRetour"
                                        onChange={formik.handleChange}
                                        value={formik.values.dateRetour}
                                    />
                                    <select
                                        className='col-4 ml-auto input--perso'
                                        type="text"
                                        name="lieuRetour"
                                        id="lieuRetour"
                                        onChange={formik.handleChange}
                                        value={formik.values.lieuRetour}
                                    >
                                        <option value='Aéroport Roland-Garros'> Aéroport Roland-Garros </option>
                                        <option value='Sainte-Marie'> Sainte-Marie</option>
                                    </select>
                                    <input
                                        className='col-3 input--perso lera ml-auto'
                                        type="time"
                                        name="timeRetour"
                                        id="timeRetour"
                                        onChange={formik.handleChange}
                                        value={formik.values.timeRetour}
                                    />

                                </div>
                                <div className='row ml-auto text-center'>
                                    {formik.errors.dateRetour && formik.touched.dateRetour && (
                                        <p className='col-4 text-danger'>{formik.errors.dateRetour}</p>
                                    )}
                                    {formik.errors.lieuRetour && formik.touched.lieuRetour && (
                                        <p className='col-5 text-danger' >{formik.errors.lieuRetour}</p>
                                    )}
                                    {formik.errors.timeRetour && formik.touched.timeRetour && (
                                        <p className='col-3 position-relative ml-auto text-danger'>{formik.errors.timeRetour}</p>
                                    )}

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className=' p-1 col-4 d-flex bd-highlight mt-5 d-flex justify-content-center nextPrev'>
                            <i onClick={prev} className="fa fa-chevron-left  d-flex align-items-center" aria-hidden="true" ></i>
                            <span className='mr-5 ml-5'>{datavoit ? datavoit.categorie.name : null}</span>
                            <i onClick={next} className="fa fa-chevron-right  d-flex align-items-center" aria-hidden="true"></i>
                        </div>
                        <div className='p-1 col-8 d-flex bd-highlight mt-5 d-flex flex-row-reverse nextPrev'>

                            <Button className=' justify-content-center nextPrev' form="my-form" variant="contained" color="primary" type="submit">
                                Charger les tarifs
                            </Button>

                        </div>
                    </div>
                </form>
            </div>
            {/* Handle change  */}

            {data.marque === 'aucun' ? (
                <div className='container-devi text-white  d-flex align-items-center justify-content-center h6'> <BsInfoSquareFill className='mr-2 text-primary' /> {data.message}</div>) :

                (data.message === 'DISPONIBLE' ? (
                    <>
                        <div className='container-devi d-flex align-items-center'>
                            STOCK DISPONIBLE : {data.stockvoiture}
                            <div className='ml-auto bg-success border--perso text-white p-2'>Disponible</div>
                        </div>

                        <div className='container-devi'>
                            <div className='row'>
                                <div className='container-devi2 col-4 mr-auto d-flex justify-content-center text--perso '> {jour} jour(s)</div>
                                <div className='container-devi2 col-4 mr-auto d-flex justify-content-center text--perso'> Forfait location</div>
                                <div className='container-devi2 col-4 mr-auto d-flex justify-content-center text--perso text-success'> {prix} €</div>
                            </div>
                            <div className='row'>
                                <label for='conducteur' className='container-devi3  col-8 mr-auto d-flex justify-content-center '>Conducteur additionnel</label>
                                <select id='conducteur' name='conducteur' className=' aloka container-devi3  col-1 mr-auto h-25 d-flex justify-content-center'>
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                                <label className='container-devi3  col-2  d-flex justify-content-center text-success '>gratuit</label>
                            </div>
                            <div className='row'>
                                <label for='baby' className='container-devi3  col-8 mr-auto d-flex justify-content-center '>Siège bébé (de 0 à 3 ans)  </label>
                                <select id='baby' onClick={siegebebe} name='baby' className=' aloka container-devi3  col-1 mr-auto h-25 d-flex justify-content-center'>
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                                <label className='container-devi3  col-2  d-flex justify-content-center text-success '>9 €</label>
                            </div>
                            <div className='row'>
                                <label for='autre' className='container-devi3  col-8 mr-auto d-flex justify-content-center '>Réhausseur (à partir de 3 ans)</label>
                                <select id='autre' onClick={rehausseur} name='autre' className=' aloka container-devi3  col-1 mr-auto h-25 d-flex justify-content-center'>
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                                <label className='container-devi3  col-2  d-flex justify-content-center text-success '>9 €</label>
                            </div>
                            <div className='row'>
                                <label for='gps' className='container-devi3  col-8 mr-auto d-flex justify-content-center '>GPS</label>
                                <Checkbox onChange={checkChange2} onClick={gps} name='gps' className=' col-1 mt-4 mr-auto d-flex justify-content-center align-items-center ' color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <label className='container-devi3  col-2  d-flex justify-content-center text-success '>27 €</label>
                            </div>
                            <div className='row'>
                                <label for='gps' className='container-devi3  col-8 mr-auto d-flex justify-content-center '>Annulation  covid</label>
                                <Checkbox onChange={checkChange1} onClick={covid} name='gps' className=' col-1 mt-4 mr-auto d-flex justify-content-center align-items-center ' color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <label className='container-devi3  col-2  d-flex justify-content-center text-success '>10 €</label>
                            </div>

                        </div>
                    </>) : (<>
                        <div className='container-devi d-flex align-items-center'>
                            STOCK DISPONIBLE : 0
                        <div className='ml-auto bg-danger border--perso text-white p-1'>Non disponible</div>
                        </div>
                    </>)
                )}

            <Info reservation={reservation} valide={valide} prix = {prix}></Info>
        </div>
    )
}
