import React, { Component, setSate } from 'react'
import { Formik, Form, Field } from 'formik';
import UnPrix from './UnPrix';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';


class AddTarif extends Component {

    state = {
        categories: [],
        voiture: [],
        nombreLigne: [1, 2, 3],
        tarifperso: [],
        dateTarif: []

    };

    componentDidMount() {
        this.getCategories();
    }
    ajoutNewPeriod = () => {
        this.setState({
            nombreLigne: [
                ...this.state.nombreLigne, this.state.nombreLigne.pop() + 1
            ]
        })

    }


    getCategories = () => {
        axios.get(`/categories/${this.props.match.params.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    categories: response.data
                });
                
            }
        });
    };



    render() {

        const category = this.state.categories.category
        const voitures = this.state.categories.voitures

        return (
            <>
                <NavLink to="/tarif" >
                    <button style={{ float: "left", margin: "10px" }} class="text-white bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                </NavLink>
                <center className="text-white">
                    <h1>Tarif personnaliser pour {category && category.name}, reference {category && category.ref}</h1>
                    <br />
                    <div className="d-flex p-0 justify-content-center align-items-center">
                        {voitures && voitures.map(voiture => {
                            return (
                                <>
                                    <div className="m-1">
                                        <fieldset>

                                            <img src={`http://fd0b515.online-server.cloud/${voiture.image.url}`} />
                                        </fieldset>
                                        <p><strong>{voiture.marque}</strong></p>
                                        <br />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="w-full max-w-lg text-justify">
                        <Formik
                            initialValues={{
                                category_id: `${this.props.match.params.id}`,
                                dateDebutPerso: '',
                                dateFinPerso: '',

                            }}
                            onSubmit={(data) => {
                            
                                const t = async () => {
                                    await axios.post('/tarif_personalises', { data, tabLigne: this.state.nombreLigne })
                                    
                                    window.location.href = "/tarif"
                                }
                                t()
                                
                            }}>

                            <Form className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-white font-bold mb-2" >
                                        Du :
                                    </label>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                    px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" name="dateDebutPerso" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-white font-bold mb-2" htmlFor="grid-last-name">
                                        Au
                                    </label>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 
                                px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="dateFinPerso" />
                                </div>

                                {
                                    this.state.nombreLigne.map((ligne) =>
                                        <UnPrix key={ligne} num={ligne} />
                                    )
                                }

                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 m-2 
                                        transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                                        onClick={this.ajoutNewPeriod}
                                    >
                                        Ajouter un ligne
                                    </button>

                                    <button
                                        type="submit"
                                        className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                        transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                    >
                                        Valider
                                    </button>
                                </div>

                            </Form>

                        </Formik>
                    </div>

                </center>



                {/* { utilisateurs && utilisateurs.length === 0 ? (<>Aucun utilisateur disponible pour le moment.</>) : null } */}


            </>
        )
    }
}

export default AddTarif;
