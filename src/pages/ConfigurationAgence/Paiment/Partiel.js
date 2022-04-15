
import React, { Component } from 'react'
import { Formik , Form, Field } from 'formik';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';



export default class Partiel extends Component {
    state = {
        inValue: null,
        paiment: null

    }
    componentDidMount(){
        this.getPaiment()
        }
    getPaiment(){
        axios.get(`/paimentpartiels`).then(response => {
            var value ={}
            if (response.data.length ==! 0){
                var objValue = response.data[0]
               
                
        
                value[`description`]= objValue.description
                value[`typ`]= objValue.typ
                value[`montant`]= objValue.montant
                value[`minimal`]= objValue.minimal
            

                this.setState({
                    inValue: value
                })
               
            }else{
                value[`description`]= ''
                value[`typ`]= ''
                value[`montant`]= ''
                value[`minimal`]= ''
                this.setState({
                    inValue: value
                })
               

            }
                  
        })
    }
    
    render() { 
        return (
            <>
                <center>
                    <div className="page-title">
                        <div className="title_left">
                            <h2>Configuration</h2>
                        </div>
                    </div>
                </center>
                {this.state.inValue ?(
                <Formik   
                    initialValues={this.state.inValue}
                    onSubmit={(value,{setSubmitting})=>{
                        setSubmitting(true)                    
                        axios.post(`/paimentpartiels` ,value)
                       
                        this.getPaiment()
                        setSubmitting(false) 
                    }}
                >
                    
                    <Form class="text-white">
                        <NavLink to="/configuration_agence" >
                            <button class="text-white m-2 bg-indigo-500 border-0 hover:bg-indigo-600 font-bold py-2 px-4 rounded">Retour</button>
                        </NavLink>
                        <div className="d-flex align-items-start">
                            <label className="block text-white tracking-wide text-gray-700 text-xs font-bold w-25" >
                                Description paiment partiel
                            </label>
                            <div className="w-50">
                                <Field className="appearance-none block w-full bg-gray-200 input-lg h6 text-gray-700 border border-red-500 rounded py-3 
                                px-3 mb-3 leading-tight focus:outline-none focus:bg-white" component="textarea" name= "description" />
                                <p>ex: à régler à la remise des clés par cart bancaire, éspéces,chéque ou chéque vacances</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start">
                            <label className="block text-white tracking-wide text-gray-700 text-xs font-bold w-25" htmlFor="grid-last-name">
                                Type de l'acompte
                            </label>
                            <div className="w-50">
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-3 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name= "typ" />
                                <p>ex:0= pourcentage/1 = montant fixe</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start">
                            <label className="block text-white tracking-wide text-gray-700 text-xs font-bold w-25" htmlFor="grid-last-name">
                                Montant
                            </label>
                            <div className="w-50">
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-3 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name= "montant" />
                                <p>ex:100 si type montant fixe/ ou 30 si type pourcentage</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start">
                            <label className="block text-white tracking-wide text-gray-700 text-xs font-bold w-25" htmlFor="grid-last-name">
                                Montant minimal pour le declenchement du paiment partiel
                            </label>
                            <div className="w-50">
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                            px-3 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" name= "minimal" />
                                <p>ex:150</p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 px-3">   
                            <button
                                type="submit"
                                className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                            >
                                Valide le modification
                            </button>
                        </div>
                            
                    </Form>
                </Formik>):<h1>Loading</h1>}
            </>
        )
    }
}
