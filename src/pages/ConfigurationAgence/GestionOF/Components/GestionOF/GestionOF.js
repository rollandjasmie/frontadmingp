import React, { Component } from 'react'
import axios from '../../../../../axios'
import { Formik, Form, Field } from 'formik';
import './gestionOF.css'
import ErrorField from '../../../../../components/ErrorField/ErrorField';
import * as Yup from 'yup';

const HoraireSchema = Yup.object().shape({
    heuredebut: Yup.string()
        .required("Vous devez entre le debut d'heure"),
    // .transform(parseDateString).min(yesterday,"la date de depart doit être supérieur à aujourd'hui"),
    heurefin: Yup.string()
        .required("Vous devez entre le fin d'heure"),
    // .when('heuredebut',(heuredebut,schema) =>{
    // 	return schema.min(heuredebut,"La fin d'heure doit être supérieur a la debut d'heure")
    //}),
});

class GestionOF extends Component {

    state = {
        horaire: []
    }
    componentDidMount() {
        this.action.getHoraire()
        // this.interval = setInterval(() =>
        //     this.action.getHoraire()
        //     , 5000)  
    }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    action = {
        getHoraire: () => {
            axios.get(`/horaire_jours`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        horaire: response.data
                    });
                    
                }
            });
        },

        deleteSaison: (heure) => {
            axios.delete(`/horaire_jours/${heure.id}`).then(response => {
                if (response.status === 204) {
                    this.action.getHoraire();
                }
            })
        }
    }
    render() {
        return (
            <>
                <div className="page-title">
                    <div className="title_left">
                        <h2> SURPLUS HORAIRE PAR JOUR </h2>
                    </div>
                </div>

                <h3>Ajouter autant de surplus horaire par jour que nécessaire . <em>Attention l'heure de départ de la tranche est inclue et l'heure de fin ne l'est pas</em></h3>

                <br />
                <br />
                <div className="row">
                    <Formik
                        initialValues={{
                            nomjour: '',
                            heuredebut: '',
                            heurefin: '',
                            prixsurplus: ''
                        }}
                        validationSchema={HoraireSchema}
                        onSubmit={(values, { resetForm }) => {
                            axios.post('/horaire_jours', values).then(response => {

                                if (response.status === 201) {
                                    this.action.getHoraire();
                                }
                            })
                            resetForm({});
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form class="d-flex align-items-start">
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                        Le :
                                </label>
                                    <Field as="select"
                                        name="nomjour"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-3 mb-3 leading-tight focus:outline-none focus:bg-white">
                                        <option value="Choisir">Choisir un jour</option>
                                        <option value="Lundi">Lundi</option>
                                        <option value="Mardi">Mardi</option>
                                        <option value="Mercredi">Mercredi</option>
                                        <option value="Jeudi">Jeudi</option>
                                        <option value="Vendredi">Vendredi</option>
                                        <option value="Samedi">Samedi</option>
                                        <option value="Dimanche">Dimanche</option>
                                    </Field>
                                    {/* <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="nomjour"/> */}
                                </div>
                                <div className="w-full md:w-1/4 px-3">
                                    <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Entre
                                </label>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="time" name="heuredebut" />
                                    <ErrorField errors={errors} touched={touched} row='heurdebut' />
                                </div>
                                <div className="w-full md:w-1/4 px-3">
                                    <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        et
                                </label>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 
                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="time" name="heurefin" />
                                    <ErrorField errors={errors} touched={touched} row='heurefin' />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block text-white tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Surplus
                                </label>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 
                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" name="prixsurplus" />
                                </div>

                                <div className="w-full md:w-1/2 px-3">

                                    <button
                                        type="submit"
                                        className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                    transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                    >
                                        Ajouter
                                </button>
                                </div>
                            </Form>)}

                    </Formik>

                </div>

                {/* Liste des jour par heure */}

                <div className="py-4">

                    <div className="mt-2">
                        <table class="table table-condensed">
                            <thead>
                                <tr>
                                    <th>Jour semaine</th>
                                    <th>Tranche horaire</th>
                                    <th>Surplus</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {this.state.horaire.map(heure => {
                                    return (
                                        <tr>
                                            <td><span >{heure.nomjour}</span></td>
                                            <td ><span >Entre  {heure.heuredebut}   et   {heure.heurefin}</span></td>
                                            <td ><span >{heure.prixsurplus}</span></td>
                                            <td ><span className="text-red-500 cursor-pointer" onClick={() => this.action.deleteSaison(heure)}>Supprimer</span></td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                    {/* { utilisateurs && utilisateurs.length === 0 ? (<>Aucun utilisateur disponible pour le moment.</>) : null } */}


                </div>
            </>
        )
    }
}
export default GestionOF