import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from '../../../../../axios'
import { NavLink } from 'react-router-dom';
import './gestionJF.css';

export default class Ajoutjour extends Component {

    state = {
        nombreLigne:[1]
    }

    ajoutNewJour =() =>{
        this.setState({
            nombreLigne: [...this.state.nombreLigne,this.state.nombreLigne.pop() + 1],  
        })
    }
    // listeJour =() => {
    //    window.location.href ="/ouverture"
    // }
    render () {
        const ligne = this.state.nombreLigne
        return(
            <>
            <div className="m-4">
            <NavLink to="ouverture" >
                <button style= {{float:"left"}} class="text-white m-4 bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
            </NavLink>
            <center>
                  
                <div className="page-title">
                     <h2> AJOUTER DES JOUR FERIES </h2>
                </div>
                
                <Formik
                    initialValues={{}}    
                    onSubmit={(value,{setSubmitting})=>{
                        setSubmitting(true);
                        axios.post('/jourferiers', {
                            value, ligne
                        })
                       
                        setSubmitting(false);
                        window.location.href ="/ouverture" 
                    }}
                
                >
                    <Form class="w-full text-white">
                    <div>
                    <table class="text-white w-200">
                        <thead>
                            <th>
                                <td> Dates </td>
                                                                                
                            </th>
                            <th>
                                <td> Jour ferier </td>
                                                                                
                            </th>
                            <th>
                                <td> Surplus </td>
                                                                                
                            </th>
                        </thead>
                        <tbody>
                            {
                            this.state.nombreLigne.map(val =>
                                <tr>
                                    <td className="input-column">
                                        <div>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                    px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" id={`date${val}`} name={`date${val}`}/>
                                        </div>
                                    </td>
                                    
                                    <td className="input-column">
                                        <div>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                    px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id={`jour${val}`} name={`jour${val}`}/>
                                        </div>
                                    </td>

                                    <td className="input-column">
                                        <div>
                                    <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                    px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" id={`prix${val}`} name={`prix${val}`}/>
                                        </div>
                                    </td>
                                </tr>
                            )}   
                        </tbody>
                    </table>
                    <div >
                        <button
                            type="button"
                            className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 m-2 
                            transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline" 
                            onClick={this.ajoutNewJour}
                        >
                            Ajouter un ligne
                        </button>
                        
                            <button
                                type="submit"
                                className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            >
                                Enregistrer
                            </button>
                        
                    </div>
                    </div>
                    </Form>
                </Formik>
            </center>
            </div>
        </>

        )
    }
}
