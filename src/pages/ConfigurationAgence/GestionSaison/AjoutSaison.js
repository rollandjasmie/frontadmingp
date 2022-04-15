import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ErrorField from '../../../components/ErrorField/ErrorField';
import axios from '../../../axios'

const SaisonSchema = Yup.object().shape({
    ref: Yup.string()
        .required('Veuillez mettre la date debut'),
    category: Yup.string()
        .required('Veuillez entrer la date fin')
});

class AjoutJour extends Component {
    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        saison_id: this.props.id,
                        debutsaison:'',
                        finsaison:''
                        
                    }}
                    validationSchema={SaisonSchema}
                    onSubmit={(values, { resetForm }) => {
                        resetForm(true)

                        axios.post('/date_saisons', values)
                        // .then(response => {
                            // const { action } = this.props
                            // if (response.status === 201) {
                            //     resetForm();
                            //     action.getSaison();
                            // }
                            
                        resetForm(false)
                        // })
                       
                    }}
                >
                    {({ errors, touched}) => (
                        <Form className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Du :
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 
                                px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" name="debutsaison"/>
                                <ErrorField errors={errors} touched={touched} row="category" />

                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Au
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 
                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="finsaison"/>
                            <ErrorField errors={errors} touched={touched} row="ref" />
                            </div>
                    
                            <div className="d-flex justify-content-end">
                            
                                <button
                                    type="submit"
                                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 
                                    transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                >
                                    Valider
                                </button>
                            </div>
                        
                        </Form>


                    )}
                </Formik>
            </div>
        )
    }
}

export default AjoutJour