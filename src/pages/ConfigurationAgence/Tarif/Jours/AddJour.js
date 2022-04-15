import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import ErrorField from '../../../../components/ErrorField/ErrorField';
import axios from '../../../../axios';
 
const JourSchema = Yup.object().shape({
    name: Yup.string()
        .required('Le nom ne doit pas être vide'),
    nombrejour: Yup.string()
        .required('Le nombre de jour ne doit pas être vide')
});
 
class AddJour extends Component {
    render() {
        return (
        <div>
            <h2>Insertion d'un nouvel jour par euro</h2>
            <Formik
            initialValues={{
                name: '',
                nombrejour: ''
            }}
            validationSchema={JourSchema}
            onSubmit={(values, { resetForm }) => {
                axios.post('/jours', values).then(response => {
                    const { action } = this.props;
                    if (response.status === 201) {
                        resetForm();
                        action.getJour();
                    }
                })
            }}
            >
            {({ errors, touched }) => (
                <Form
                    autoComplete="off">
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-1 md:mb-0">
                            Nom jour par euro
                        </label>
                        <Field
                            autoFocus
                            name="name"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                        <ErrorField errors={errors} touched={touched} row="name"/>
                    </div>
                    
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-1 md:mb-0">
                            Nombre de Jour
                        </label>
                        <Field
                            autoFocus
                            name="nombrejour"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                        <ErrorField errors={errors} touched={touched} row="nombrejour"/>
                    </div>
                    <button type="submit" className="text-white px-4 py-2 bg-blue-500 hover:bg-blue-400">Enregistre</button>
                </Form>
            )}
            </Formik>
        </div>)
    }
}

export default AddJour;